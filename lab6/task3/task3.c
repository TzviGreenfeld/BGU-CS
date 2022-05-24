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
void handleSinglePipe(cmdLine *line);
int **createPipes(int nPipes);
void releasePipes(int **pipes, int nPipes);
int *leftPipe(int **pipes, cmdLine *pCmdLine);
int *rightPipe(int **pipes, cmdLine *pCmdLine);
int pipeCount(cmdLine *line);
void executePipes (cmdLine *line);

void debug(char *err)
{
    if (DEBUG)
    {
        fprintf(stderr, "%s\n", err);
    }
}

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
    int pipesAmount = pipeCount(lineptr);
    if (pipesAmount > 1)
    {
       executePipes(lineptr);
    }
    if (strcmp(lineptr->arguments[0], "quit") == 0)
    {
        exit(0);
    }
    else if (strcmp(lineptr->arguments[0], "cd") == 0)
    {
        cd(lineptr);
        return;
    }

    if (execvp(lineptr->arguments[0], lineptr->arguments) == -1)
    {
        perror("executaion failed\n");
        printf("%s failed\n", lineptr->arguments[0]);
        _exit(1);
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

void setIO(cmdLine *line)
{
    if (line->inputRedirect)
    {
        close(STDIN);
        open(line->outputRedirect, O_RDONLY);
    }

    if (line->outputRedirect)
    {
        close(STDOUT);
        open(line->outputRedirect, O_WRONLY | O_CREAT, 0777);
    }
}

void handleSinglePipe(cmdLine *line)
{

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

        execvp(line->arguments[0], line->arguments);
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
            debug("(child2>going to execute cmd: …)");
            execvp(line->next->arguments[0], line->next->arguments);
        }
        else if (pid2 > 0)
        { // parent process
            debug("(parent_process>closing the read end of the pipe…)");
            close(fd[0]);
            debug("(parent_process>waiting for child processes to terminate…)");
            waitpid(pid1, NULL, 0);
            waitpid(pid2, NULL, 0);
            debug("(parent_process>exiting…)");
            freeCmdLines(line);
        }
    }
}

int **createPipes(int nPipes)
{
    int **pipes;
    pipes = (int **)calloc(nPipes, sizeof(int));

    for (int i = 0; i < nPipes; i++)
    {
        pipes[i] = (int *)calloc(2, sizeof(int));
        pipe(pipes[i]);
    }
    return pipes;
}
void releasePipes(int **pipes, int nPipes)
{
    for (int i = 0; i < nPipes; i++)
    {
        free(pipes[i]);
    }
    free(pipes);
}
int *leftPipe(int **pipes, cmdLine *pCmdLine)
{
    if (pCmdLine->idx == 0)
        return NULL;
    return pipes[pCmdLine->idx - 1];
}

int *rightPipe(int **pipes, cmdLine *pCmdLine)
{
    if (pCmdLine->next == NULL)
        return NULL;
    return pipes[pCmdLine->idx];
}

int pipeCount(cmdLine *line)
{
    int i = 0;
    cmdLine *head;
    for (head = line; head != NULL; head = head->next)
    {
        i++;
    }
    return i;
}

void executePipes (cmdLine *line){
    cmdLine* head = line;
    int i, pid, pipesAmount;
    pipesAmount = pipeCount(line);
    int **pipes = createPipes(line, pipesAmount);
    i = 0;
    while (head)
    {
        pid = fork();
        if (pid != 0)
        { // parent process
            if(leftPipe(pipes,next)!=NULL){
                if(debug){debug_p(PRE_CLOSE_READ,0);}
                close(*leftPipe(pipes,next));
            }
            if(rightPipe(pipes,next)!=NULL){
                if(debug){debug_p(PRE_CLOSE_WRITE,0);}
                close(*(rightPipe(pipes,next)+1));
            }
        }
    }



}