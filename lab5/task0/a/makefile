
all: exec

exec: myshell.o

	gcc -g -m32 -Wall -o myshell myshell.o	

myshell.o: myshell.c
	gcc -m32 -Wall -c myshell.c -o myshell.o


.PHONY: clean
clean:
	rm -f *.o myshell

