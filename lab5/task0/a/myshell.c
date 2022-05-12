#include "linux/limits.h"
#include "LineParser.h"
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#define INPUT_BUFF_SIZE 2048 

void execute(cmdLine *pCmdLine);

int main(int argc, char *argv[]){

    // print current working directory
    char cwd[PATH_MAX];
    if (getcwd(cwd, PATH_MAX) == 0){
        return 1;
    }
    printf("%s\n", cwd);
    
    // take user input
    char inputBuffer[INPUT_BUFF_SIZE];
    struct cmdLine *line;
    while(1){
        fgets(inputBuffer, INPUT_BUFF_SIZE, stdin);
        if (strncmp(inputBuffer, "quit", 4) == 0){
            return 0;
        }
        line = parseCmdLines(inputBuffer);
        execute(line);
        freeCmdLines(line);
    }


    return 0;
}


void execute(cmdLine *pCmdLine){
    char* command = pCmdLine->arguments[0];
    char commandPath[] = "/bin/";
    strcat(commandPath, command);
    printf(command);
    printf(commandPath);
    if (execv(commandPath, pCmdLine->arguments) == - 1){
        perror("Error");
        exit(1);
    }
}