#include "util.h"

#define STDIN 0
#define STDOUT 1
#define STDERR 2
#define SYS_READ 3
#define SYS_WRITE 4


int main (int argc , char* argv[], char* envp[])
{
    extern void system_call();

    char input[255];
    system_call(SYS_READ, STDIN, input, 255);

    int spaceCounter = 0;
    int i;
    for (i = 0; i < 255; i++){
        if (input[i] == ' ' && input[i+1] != ' '){
            spaceCounter++;
        }
    }

    spaceCounter++;
    char wordsCount[32];
    int j = 0;
    while (spaceCounter > 0)
    {
        int a = spaceCounter % 10;
        wordsCount[j++] = a | '0';
        spaceCounter /= 10;
    }
    wordsCount[j] = '\n';
    system_call(SYS_WRITE, STDOUT, wordsCount, 32);
    return 0;
}