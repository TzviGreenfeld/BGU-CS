#include "util.h"

#define O_RDONLY 00
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
#define getdents 141
extern int strcmp(const char *str1, const char *str2); 
extern char *strcat(char *dest, char *src);
extern int system_call();

int DEBUG = 0;


void debug(char *er) {
    if(DEBUG){
	    system_call(SYS_WRITE, STDERR, er, strlen(er));
    }
}

void print(char* str){
    int write = system_call(SYS_WRITE, STDOUT, str, strlen(str));
    char write_returned[36];
    debug(strcat("syscall: 04 returned: ", itoa(write)));
}

int main (int argc , char* argv[], char* envp[])
{   
    
	
    int i;
	for(i = 1; i < argc; i++){
		if (strcmp(argv[i],"-D") == 0){
			DEBUG = 1;
        }	
        if ( (argv[i][1] == 'i') || (argv[i][1] == 'a') ){

			int prefLen = strlen(argv[i]) - 2;
			char prefix[prefLen];
			int j;
			for (j = 0; j < prefLen; j++){
				prefix[j] = argv[i][j+2];
			}
			prefix[j] = '\0';
				
			if (argv[i][1] == 'i'){

			}
			
			if (argv[i][1] == 'a'){

			}
        }
    }
    print("Flame 2 strikes!");
    int fd = system_call(OPEN, ".", O_RDONLY, 0777);
    char *deb = "syscall: 05 returned: ";
    debug(strcat(strcat(deb, itoa(fd)), "\n") );
    

    return 0;
}