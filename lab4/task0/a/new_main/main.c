#include "util.h"
#include <sys/syscall.h>



#define SYS_WRITE 4
#define STDOUT 1

int main (int argc , char* argv[], char* envp[])
{
  extern void system_call();
  system_call(SYS_WRITE,STDOUT,"Hi, my name is \nwhat? \n", 25);
  return 0;
}
