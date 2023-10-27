#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <linux/limits.h>
#include <sys/types.h>
#include <sys/wait.h>
#include "LineParser.h"
#include <sys/fcntl.h>

#define INPUT_BUFF_SIZE 2048
#define FASLE 0
#define TRUE 1
#define STDIN 0
#define STDOUT 1

int DEBUG = FASLE;

void cd(cmdLine *lineptr);
void execute(cmdLine *lineptr);
void printcwd();
void testArgs(int argc, char **argv);
void setIO(cmdLine *line);

int main(int argc, char **argv)
{
    testArgs(argc, argv);

    while (1)
    {
        printcwd();
        char inputBuffer[INPUT_BUFF_SIZE];
        // get line from user
        fgets(inputBuffer, INPUT_BUFF_SIZE, stdin);

        cmdLine *line = parseCmdLines(inputBuffer);
        int pid;

        if (DEBUG)
            fprintf(stderr, "PID is: %d\tExecuting command: %s\n", getpid(), line->arguments[0]);

        pid = fork();
        if (pid == 0)
        { // child process
            execute(line);
        }
        else if (pid > 0)
        { // parent process
            if (line->blocking)
            {
                // got &, waiting for the child process
                waitpid(pid, NULL, 0);
            }
            freeCmdLines(line);
        }
    }
    return 0;
}

void testArgs(int argc, char **argv)
{
    for (int i = 1; i < argc; i++)
    {
        if (strcmp(argv[i], "-d") == 0)
        {
            DEBUG = TRUE;
        }
    }
}

void printcwd()
{
    // get and display current working directory
    char cwd[PATH_MAX];
    getcwd(cwd, PATH_MAX);
    printf("%s\n$ ", cwd);
}

void execute(cmdLine *lineptr)
{
    setIO(lineptr);
    if (strcmp(lineptr->arguments[0], "quit") == 0)
    {
        exit(0);
    }
    else if (strcmp(lineptr->arguments[0], "cd") == 0)
    {
        cd(lineptr);
        return;
    }

    execvp(lineptr->arguments[0], lineptr->arguments);
    // if execvp returned
    perror("executaion failed\n");
    _exit(1);
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

void setIO(cmdLine *line)
{
    if (line->inputRedirect)
    {
        close(STDIN);
        open(line->inputRedirect, O_RDONLY);
    }

    if (line->outputRedirect)
    {
        close(STDOUT);
        open(line->outputRedirect, O_WRONLY | O_CREAT, 0777);
    }
}

