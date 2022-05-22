#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <linux/limits.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <sys/fcntl.h>
#include "LineParser.h"

#define INPUT_BUFF_SIZE 2048

#define FASLE 0
#define TRUE 1

int DEBUG = FASLE;

void cd(cmdLine *lineptr);
void execute(cmdLine *lineptr);

int main(int argc, char **argv)
{
    for (int i = 1; i < argc; i++)
    {
        if (strcmp(argv[i], "-d") == 0)
        {
            DEBUG = TRUE;
        }
    }
    FILE *instream = stdin;
    char cwd[PATH_MAX];

    // get line from user
    char inputBuffer[INPUT_BUFF_SIZE];
    cmdLine *line = parseCmdLines(inputBuffer);
    while (1)
    {
        // get and display current working directory
        getcwd(cwd, PATH_MAX);
        printf("%s\n", cwd);

        // get line and parse it
        fgets(inputBuffer, INPUT_BUFF_SIZE, instream);
        cmdLine *line = parseCmdLines(inputBuffer);
        execute(line);
        freeCmdLines(line);
    }
    return 0;
}

void execute(cmdLine *lineptr)
{
    int instream = stdin;
    int outstream = stdout;

    // handle line
    if (strcmp(lineptr->arguments[0], "quit") == 0)
    {
        exit(0);
    }

    int pid;

    if (DEBUG)
        fprintf(stderr, "PID is: %d\tExecuting command: %s\n", getpid(), lineptr->arguments[0]);

    if (strcmp(lineptr->arguments[0], "cd") == 0)
    {
        cd(lineptr);
    }
    else if ((pid = fork()) == 0)
    {
        // child process
        if (lineptr->inputRedirect != NULL)
        {
            close(instream);
            instream = open(lineptr->inputRedirect, O_RDONLY);
            if (instream < 0)
            {
                exit(1);
            }
        }
        if (lineptr->outputRedirect != NULL)
        {
            close(outstream);
            outstream = open(lineptr->outputRedirect, O_WRONLY | O_CREAT, 0777);
            if (outstream < 0)
            {
                exit(1);
            }
        }
        // invokes the program specified in the cmdline
        if (execvp(lineptr->arguments[0], lineptr->arguments) == -1)
        {
            perror("executaion failed\n");
            _exit(1);
        }
    }
    else
    {
        // parent process
        if (lineptr->blocking)
        {
            // got &, waiting for the child process
            waitpid(pid, NULL, 0);
        }
    }
}

void cd(cmdLine *lineptr)
{
    char cwd[PATH_MAX];
    getcwd(cwd, PATH_MAX);
    char *path = strcat(cwd, "/");
    // execute and handle error
    if (lineptr->argCount != 2 || chdir(strcat(path, lineptr->arguments[1])) == -1)
    {
        perror("CD ERROR\n");
    }
}