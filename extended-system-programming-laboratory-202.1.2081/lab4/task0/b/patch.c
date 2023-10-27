#include "util.h"


#define SYS_WRITE 4
#define LSEEK 19
#define OPEN 5
#define STDOUT 1
#define RW 2
#define CLOSE 6

int main (int argc , char* argv[]){
    extern int system_call();
    char* FILENAME = argv[1];
    char* X_NAME = argv[2];

    int replace = 0x291;
    int fd = system_call(OPEN, FILENAME, RW, 0777);
    if (fd == -1){
        
    }
    system_call(LSEEK, fd, 0x291, 1);
    system_call(SYS_WRITE, fd, X_NAME, strlen(X_NAME));
    system_call(CLOSE, fd);

    return 0;
}