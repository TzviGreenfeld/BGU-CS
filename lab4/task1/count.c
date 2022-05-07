#include "util.h"
#include "sys/fcntl.h"

#define STDIN 0
#define STDOUT 1
#define STDERR 2
#define SYS_READ 3
#define SYS_WRITE 4
#define OPEN 5
#define CLOSE 6
extern int system_call();

void intToString(char *str, int num)
{
    int i = 0;
    while (num > 0)
    {
        int a = num % 10;
        str[i++] = a | '0';
        num /= 10;
    }
    str[i] = '\n';
}

void debug(char *er, int DEBUG, int newLine)
{
    if (DEBUG)
    {
        system_call(SYS_WRITE, STDERR, er, strlen(er));
        if (newLine)
            system_call(SYS_WRITE, STDERR, "\n", 1);
    }
}

int main(int argc, char *argv[], char *envp[])
{
    int DEBUG = 0, IN_FILE = 0, OUT_FILE = 0;
    int inStream = STDIN;
    int outStream = STDOUT;

    int i;
    for (i = 1; i < argc; i++)
    {
        if (strcmp(argv[i], "-D") == 0)
            DEBUG = 1;
        if ((argv[i][1] == 'i') || (argv[i][1] == 'o'))
        {

            int nameLen = strlen(argv[i]) - 2;
            char fileName[nameLen];
            int j;
            for (j = 0; j < nameLen; j++)
            {
                fileName[j] = argv[i][j + 2];
            }
            fileName[j] = '\0';

            if (argv[i][1] == 'i')
            {
                IN_FILE = 1;
                debug("input file flag found: ", DEBUG, 0);
                debug(fileName, DEBUG, 1);
                inStream = system_call(OPEN, fileName, O_RDWR, 0777);

                if (inStream == -1)
                {
                    debug("can't open input file", DEBUG, 1);
                }
            }

            if (argv[i][1] == 'o')
            {
                debug("output file flag found:", DEBUG, 0);
                debug(fileName, DEBUG, 1);
                OUT_FILE = 1;
                outStream = system_call(OPEN, fileName, O_WRONLY | O_TRUNC | O_CREAT, 0644);
            }
        }
    }
    if (!IN_FILE)
        debug("stdin", DEBUG, 1);
    if (!OUT_FILE)
        debug("stdout", DEBUG, 1);

    char input[255];
    int read = system_call(SYS_READ, inStream, input, 255);
    char read_returned[36];
    debug("syscall: 03 returned: ", DEBUG, 0);
    intToString(read_returned, read);
    debug(read_returned, DEBUG, 1);

    int spaceCounter = 0;
    for (i = 0; i < 255; i++)
    {
        if (input[i] == ' ' && input[i + 1] != ' ')
        {
            spaceCounter++;
        }
    }

    spaceCounter++;
    char wordsCount[32];
    intToString(wordsCount, spaceCounter);

    int write = system_call(SYS_WRITE, outStream, wordsCount, 32);

    char write_returned[36];
    debug("syscall: 04 returned: ", DEBUG, 0);
    intToString(write_returned, write);
    debug(write_returned, DEBUG, 1);

    if (IN_FILE)
    {
        int close = system_call(CLOSE, inStream);
        char close_returned[36];
        debug("syscall: 06 returned: ", DEBUG, 0);
        intToString(close_returned, close);
        debug(close_returned, DEBUG, 1);
    }
    if (OUT_FILE)
    {
        int close2 = system_call(CLOSE, outStream);
        char close2_returned[36];
        debug("syscall: 06 returned: ", DEBUG, 0);
        intToString(close2_returned, close2);
        debug(close2_returned, DEBUG, 1);
    }
    return 0;
}