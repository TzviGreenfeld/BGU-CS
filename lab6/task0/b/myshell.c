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
#define STDIN 0
#define STDOUT 1

int DEBUG = FASLE;

void cd(cmdLine *lineptr);
void execute(cmdLine *lineptr);

void debug(char *err)
{
    if (DEBUG)
    {
        fprintf(stderr, "%s\n", err);
    }
}

int main(int argc, char **argv)
{
    for (int i = 1; i < argc; i++)
    {
        if (strcmp(argv[i], "-d") == 0)
        {
            DEBUG = TRUE;
        }
    }

    // get line from user
    char inputBuffer[INPUT_BUFF_SIZE];
    cmdLine *line = parseCmdLines(inputBuffer);

    int fd[2];
    if (pipe(fd) == -1)
    {
        printf("error in first pipe");
        exit(1);
    }

    debug("(parent_process>forking…)");
    int pid1 = fork();
    if (DEBUG && pid1 > 0)
        fprintf(stderr, "(parent_process>created processwith id: %d\n", pid1);

    if (pid1 == -1)
    {
        printf("error in first fork");
        exit(1);
    }
    else if (pid1 == 0)
    { // child1 process

        close(STDOUT);
        debug("(child1>redirecting stdout to the write end of the pipe…)");
        dup(fd[1]);
        close(fd[1]);
        debug("(child1>going to execute cmd: ls -l)");
        line = parseCmdLines("ls -l");
        execvp(line->arguments[0], line->arguments);
        freeCmdLines(line);
    }
    else if (pid1 > 0)
    { // parnet process
        debug("(parent_process>closing the write end of the pipe…)");
        close(fd[1]);
        int pid2 = fork();
        if (pid2 == -1)
        {
            printf("error in first fork");
            exit(1);
        }
        else if (pid2 == 0)
        { // child2 process

            close(STDIN);
            dup(fd[0]);
            debug("(child2>redirecting stdin to the read end of thepipe…)");
            close(fd[0]);
            line = parseCmdLines("tail -n 2");
            debug( "(child2>going to execute cmd: …)");
            execvp(line->arguments[0], line->arguments);
            // freeCmdLines(line);
        }
        else if (pid2 > 0)
        { // parent process
            debug("(parent_process>closing the read end of the pipe…)");
            close(fd[0]);
            debug("(parent_process>waiting for child processes to terminate…)");
            waitpid(pid1, NULL, 0);
            waitpid(pid2, NULL, 0);
            debug("(parent_process>exiting…)");
        }
    }
    return 0;
}
/*
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
            // invokes the program specified in the cmdline
            close(outstream);
            outstream = open(lineptr->outputRedirect, O_WRONLY | O_CREAT, 0777);
            if (outstream < 0)
            {
                exit(1);
            }
        }
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
*/