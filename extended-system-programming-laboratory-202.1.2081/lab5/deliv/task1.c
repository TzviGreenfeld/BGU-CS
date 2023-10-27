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

int DEBUG = FASLE;

void cd (cmdLine *lineptr);
void execute(cmdLine *lineptr);


int main(int argc, char **argv){
    for (int i=1; i< argc;i++){
        if (strcmp(argv[i], "-d") == 0){
            DEBUG = TRUE;
            }
        }
              

    while (1){
        char cwd[PATH_MAX];
        char inputBuffer [INPUT_BUFF_SIZE];

        // get and display current working directory 
        getcwd(cwd, PATH_MAX);
        printf("%s\n", cwd);

        // get line from user
        fgets (inputBuffer, INPUT_BUFF_SIZE, stdin);

        // handle line
        if(strcmp(inputBuffer, "quit\n") == 0){
            exit(0);
        }

        cmdLine *line = parseCmdLines(inputBuffer);
        int pid;

        if (DEBUG) 
            fprintf(stderr, "PID is: %d\tExecuting command: %s\n", getpid(), line->arguments[0]);

        if(strcmp(line->arguments[0], "cd") == 0){
            cd(line);
        }
        // child process 
        else if((pid = fork()) == 0){
            // invokes the program specified in the cmdLine
            execute(line);
        // parent process
        }else{
            if(line->blocking){
                // got &, waiting for the child process
                waitpid(pid, NULL, 0);
            }
            freeCmdLines(line);
        }
    }
    return 0;
  }


void execute(cmdLine *lineptr){
    execvp(lineptr->arguments[0],lineptr->arguments);
    // if execvp returned 
    perror ("executaion failed\n");
    _exit(1);
}

void cd (cmdLine *lineptr){
    char cwd[PATH_MAX];
    getcwd(cwd, PATH_MAX);
     char *path = strcat(cwd,"/");
     // execute and handle error
     if(lineptr->argCount != 2 || chdir(strcat(path, lineptr->arguments[1])) == -1){
         perror ("CD ERROR\n");
     } 
}