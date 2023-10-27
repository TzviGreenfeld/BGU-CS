#include <stdio.h>
#include <unistd.h>
#include <signal.h>





void sig_handler(int signum) {
   char* signame = strsignal(signum);
   printf("\nreceived signal: %s\n", signame);
   signal(signum, SIG_DFL);
   if (signum == SIGTSTP){
		signal(SIGCONT, sig_handler);
   }
   if (signum == SIGCONT){
		signal(SIGTSTP, sig_handler);
   }
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
