#include "util.h"

#define STDIN 0
#define STDOUT 1
#define STDERR 2
#define O_WRONLY 01
#define O_RDWR 02
#define	O_CREAT	0x0200	
#define SYS_READ 3
#define SYS_WRITE 4
#define OPEN 5
#define CLOSE 6
extern int system_call();

void debug(char *er, int DEBUG) {
    if(DEBUG){
	    system_call(SYS_WRITE, STDERR, "DEBUG: ", 7);
	    system_call(SYS_WRITE, STDERR, er, strlen(er));
	    system_call(SYS_WRITE, STDERR, "\n", 1);
    }
}

int main (int argc , char* argv[], char* envp[])
{   
    int DEBUG = 0, IN_FILE = 0, OUT_FILE = 0;
    int inStream = STDIN;
	int outStream = STDOUT;

	
    int i;
	for(i = 1; i < argc; i++){
		if (strcmp(argv[i],"-D") == 0)		
			DEBUG = 1;
		if ( (argv[i][1] == 'i') || (argv[i][1] == 'o') ){

			int nameLen = strlen(argv[i]) - 2;
			char fileName[nameLen];
			int j;
			for (j = 0; j < nameLen; j++){
				fileName[j] = argv[i][j+2];
			}
			fileName[j] = '\0';
				
			if (argv[i][1] == 'i'){
				IN_FILE = 1;
                debug("input file flag found:", DEBUG);
                debug(fileName, DEBUG);
				inStream = system_call(OPEN, fileName, O_RDWR, 0777);
                
				if (inStream  == -1){
                        debug("can't open input file", DEBUG);
				}
			}
			
			if (argv[i][1] == 'o'){
                debug("output file flag found:", DEBUG);
                debug(fileName, DEBUG);
				OUT_FILE = 1;
				outStream = system_call(OPEN, fileName, O_WRONLY | O_CREAT);
			}
        }
    }


    char input[255];
    system_call(SYS_READ, inStream, input, 255);



    int spaceCounter = 0;
    for (i = 0; i < 255; i++){
        if (input[i] == ' ' && input[i+1] != ' '){
            spaceCounter++;
        }
    }

    spaceCounter++;
    char wordsCount[32];
    int t = 0;
    while (spaceCounter > 0)
    {
        int a = spaceCounter % 10;
        wordsCount[t++] = a | '0';
        spaceCounter /= 10;
    }

    debug("words counted:", DEBUG);
    debug(wordsCount, DEBUG);
    wordsCount[t] = '\n';
    system_call(SYS_WRITE, outStream, wordsCount, 32);

    if(IN_FILE)
        system_call(CLOSE, inStream);
    if(OUT_FILE)
        system_call(CLOSE, outStream);
    return 0;
}