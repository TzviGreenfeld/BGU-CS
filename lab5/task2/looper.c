#include <stdio.h>
#include <unistd.h>
#include <signal.h>





void sig_handler(int signum) {
   char* signame = strsignal(signum);
   printf("\nLooper handling %s\n", signame);
   if (signum == SIGTSTP){
		signal(SIGINT, sig_handler);
		signal(SIGCONT, sig_handler);
   }
   if (signum == SIGCONT){
		signal(SIGTSTP, sig_handler);
   }
   signal(signum, SIG_DFL);
   raise(signum);
}


int main(int argc, char **argv){ 
	
	printf("Starting the program\n");
		signal(SIGINT, sig_handler);
		signal(SIGTSTP, sig_handler);
		signal(SIGCONT, sig_handler);
	while(1) {
		sleep(2);
	}

	return 0;
}

