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

int DEBUG = 0, IN_FILE = 0, OUT_FILE = 0;
int inStream = STDIN;
int outStream = STDOUT;

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



void debug(char *er)
{
    if (DEBUG)
        system_call(SYS_WRITE, STDERR, er, strlen(er));
}

int main(int argc, char *argv[], char *envp[])
{
    


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
            
                inStream = system_call(OPEN, fileName, O_RDWR, 0777);

                if (inStream == -1)
                {
                    debug("can't open input file");
                    debug("\n");
                }
            }

            if (argv[i][1] == 'o')
            {
                
                OUT_FILE = 1;
                outStream = system_call(OPEN, fileName, O_WRONLY | O_TRUNC | O_CREAT, 0644);
            }
        }
    }

    
    debug("in: ");
    debug(itoa(inStream));
    debug(" out: ");
    debug(itoa(outStream));
    debug("\n");
    
    char read_returned[32];
    char input[1];
    int spaceCounter = 0, isPrevSpace = 0;
    int read = system_call(SYS_READ, inStream, input, 1);
    debug("system call [arg1, arg2, arg3, arg4, ret code] = 3 ");
    debug(itoa(inStream));
    debug(" 0 0 ");
    debug(itoa(read));
    debug("\n");


/*system call [arg1, arg2, arg3, arg4, ret code] = 3, 0, 72, 1, 1*/
    while(read == 1){
        if(input[0] == ' '){ 
            isPrevSpace = 1;
        }
        if(input[0] != ' '){
            if (isPrevSpace){ 
                spaceCounter++;
            } 
            isPrevSpace = 0;
        }
        if(input[0] == '\n'){
            spaceCounter++;
            isPrevSpace = 0;
            char wordsCount[256];
            intToString(wordsCount, spaceCounter);
            int write = system_call(SYS_WRITE, outStream, wordsCount, 32);
            spaceCounter = 0;
        }
        read = system_call(SYS_READ, inStream, input, 1);
        debug("system call [arg1, arg2, arg3, arg4, ret code] = 3 ");
        debug(itoa(inStream));
        debug(" 0 0 ");
        debug(itoa(read));
        debug("\n");

  }

    

    if (IN_FILE)
    {
        int close = system_call(CLOSE, inStream);
        debug("system call [arg1, arg2, arg3, arg4, ret code] = 6 ");
        debug(itoa(inStream));
        debug(" 0 0 0 ");
        debug(itoa(close));
        debug("\n");
    }
    if (OUT_FILE)
    {
        int close2 = system_call(CLOSE, outStream);
        char close2_returned[36];
        debug(itoa(inStream));
        debug(" 0 0 0 ");
        debug(itoa(close2));
        debug("\n");
    }
    return 0;
}
