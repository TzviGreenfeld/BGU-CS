#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <linux/limits.h>
#include <sys/types.h>
#include <sys/wait.h>
#include "LineParser.h"

#define INPUT_BUFF_SIZE 2048
#define FASLE 0
#define TRUE 1
#define TERMINATED -1
#define RUNNING 1
#define SUSPENDED 0

typedef struct process
{
    cmdLine *cmd;         /* the parsed command line*/
    pid_t pid;            /* the process id that is running the command*/
    int status;           /* status of the process RUNNING/SUSPENDED/TERMINATED */
    struct process *next; /* next process in chain */
} process;

void cd(cmdLine *lineptr);
void execute(cmdLine *lineptr);
void addProcess(process **process_list, cmdLine *cmd, pid_t pid);
void printProcessList(process **process_list);
void printSingleProcess(process *proc);
void freeProcessList(process *process_list);
void updateProcessList(process **process_list);
void updateProcessStatus(process *process_list, int pid, int status);
void nap(process **process_list, int pid, int t);
void stop(process **process_list, int pid);

int DEBUG = FASLE;
int main(int argc, char **argv)
{
    for (int i = 1; i < argc; i++)
    {
        if (strcmp(argv[i], "-d") == 0)
        {
            DEBUG = TRUE;
        }
    }

    process **process_list = (process **)malloc(sizeof(process *));
    *process_list = NULL;

    while (1)
    {
        char cwd[PATH_MAX];
        char inputBuffer[INPUT_BUFF_SIZE];

        // get and display current working directory
        getcwd(cwd, PATH_MAX);
        printf("%s\n", cwd);

        fgets(inputBuffer, INPUT_BUFF_SIZE, stdin);
        if (strcmp(inputBuffer, "quit\n") == 0)
        {
            freeProcessList(*process_list);
            free(process_list);
            exit(0);
        }

        cmdLine *line = parseCmdLines(inputBuffer);
        int currPid;

        if (DEBUG)
            fprintf(stderr, "PID: %d\tExecuting command: %s\n", getpid(), line->arguments[0]);

        if (strcmp(line->arguments[0], "cd") == 0)
        {
            cd(line);
            freeCmdLines(line);
        }
        else if (strcmp(line->arguments[0], "showprocs") == 0)
        {
            printProcessList(process_list);
            freeCmdLines(line);
        }
        else if (strcmp(line->arguments[0], "nap") == 0)
        {
            nap(*process_list, atoi(line->arguments[1]), atoi(line->arguments[2]));
            freeCmdLines(line);
        }
        else if (strcmp(line->arguments[0], "stop") == 0)
        {
            stop(*process_list, atoi(line->arguments[1]));
            freeCmdLines(line);
        }
        else if ((currPid = fork()) == 0)
        {
            // child process
            execute(line);
        }
        else
        {
            // parent process
            addProcess(process_list, line, currPid);
            if (line->blocking)
            {
                // got &, waiting for the child process
                waitpid(currPid, NULL, 0);
            }
        }
    }
    return 0;
}

void execute(cmdLine *lineptr)
{
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
    // error handleing
    if (lineptr->argCount != 2 || chdir(strcat(path, lineptr->arguments[1])) == -1)
    {
        perror("error\n");
    }
}

void addProcess(process **process_list, cmdLine *cmd, pid_t pid)
{
    process *proc = malloc(sizeof(process));
    proc->cmd = cmd;
    proc->pid = pid;
    proc->status = RUNNING;
    proc->next = *process_list;
    *process_list = proc;
}

void printSingleProcess(process *proc)
{
    printf("%d\t%s\t", proc->pid, proc->cmd->arguments[0]);
    if (proc->status == TERMINATED)
        printf("Terminated\n");
    else if (proc->status == RUNNING)
        printf("Running\n");
    else
        printf("Suspended\n");
}

void printProcessList(process **process_list)
{
    updateProcessList(process_list);
    printf("PID\tCommand\t\tSTATUS\n");
    process *prevProc = NULL;
    process *currProc; // head
    currProc = *process_list;
    while (currProc != NULL)
    {
        printSingleProcess(currProc);
        // currProc = currProc->next;
        if (currProc->status == TERMINATED)
        {
            if (currProc == *process_list)
            {
                // head termineted, delete by reassigning head
                *process_list = currProc->next;
                prevProc = NULL;
            }
            else
            {
                // curr is not head, remove it like normal link
                prevProc->next = currProc->next;
            }
            freeCmdLines(currProc->cmd);
            free(currProc);
            if (prevProc == NULL)
            {
                // reassign head if prev was head
                currProc = *process_list;
            }
        }
        else
        {
            prevProc = currProc;
            currProc = currProc->next;
        }
    }
}

void freeProcessList(process *process_list)
{
    // loop over the linked list and free each process and its line struct
    process *currProc = process_list;
    process *nextProc;
    while (currProc != NULL)
    {
        nextProc = currProc->next;
        freeCmdLines(currProc->cmd);
        free(currProc);
        currProc = nextProc;
    }
}

void updateProcessStatus(process *process_list, int pid, int status)
{
    // find the process in a given list
    process *currProc;
    for (currProc = process_list; currProc != NULL; currProc = currProc->next)
    {
        if (currProc->pid == pid)
        {
            currProc->status = status;
            return;
        }
    }
}

void updateProcessList(process **process_list)
{
    int pid;
    int status;
    process *currProc;
    for (currProc = *process_list; currProc != NULL; currProc = currProc->next)
    {
        if (currProc->cmd->blocking)
        {
            // waitpid is a blocking method, when using blocking
            // therfore it returns when the process is TERMINATED
            updateProcessStatus(*process_list, currProc->pid, TERMINATED);
        }
        else
        {
            // WNOHANG returns immedieately might be good for busy wait
            // WUNTRACED check for child process, returns if cild has stopped
            // WCONTINUED check for child process, returns if cild has continued
            pid = waitpid(currProc->pid, &status, WNOHANG | WUNTRACED | WCONTINUED);
            if (pid > 0)
            {
                // is child process
                // WIFSTOPPED returns 1 if the given process stopped
                // WIFCONTINUED returns 1 if the given process resumed
                if (WIFSTOPPED(status))
                {
                    updateProcessStatus(*process_list, currProc->pid, SUSPENDED);
                }
                else if (WIFCONTINUED(status))
                {
                    updateProcessStatus(*process_list, currProc->pid, RUNNING);
                }
                else
                {
                    // the other optin is terminated
                    updateProcessStatus(*process_list, currProc->pid, TERMINATED);
                }
            }
        }
    }
}

void nap(process **process_list, int t, int pid)
{
    if (fork() == 0)
    {
        if (kill(pid, SIGTSTP) != -1)
        {
            updateProcessStatus(*process_list, pid, SUSPENDED);
            sleep(t);
            if (kill(pid, SIGCONT) != -1)
            {
                updateProcessStatus(*process_list, pid, RUNNING);
                exit(0);
            }
        }
        exit(1); // one of the kill failed
    }
}

void stop(process **process_list, int pid)
{
    if (kill(pid, SIGINT) != -1)
    {
        updateProcessStatus(process_list, pid, TERMINATED);
    }
    else{
        exit(1);
    }
}