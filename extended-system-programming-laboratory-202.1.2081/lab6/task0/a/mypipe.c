#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

#define BUFFSIZE 32

int main()
{
	int fd[2]; // store two ends of first pipe
			   // fd[0] = read , fd[1] = write

	char *hello = "hello";
	char readBuffer[BUFFSIZE];
	readBuffer[strlen(hello)] = 0;
	pid_t p;

	if (pipe(fd) == -1)
	{
		fprintf(stderr, "Pipe Failed");
		return 1;
	}

	p = fork();
	if (p < 0)
	{
		fprintf(stderr, "fork Failed");
		return 1;
	}

	// child process
	else if (p == 0)
	{
		close(fd[0]);
		write(fd[1], hello, strlen(hello));
	}

	// Parent process
	else
	{
		close(fd[1]);
		read(fd[0], readBuffer, strlen(hello));
		printf("%s\n", readBuffer);
	}
	return 0;
}
