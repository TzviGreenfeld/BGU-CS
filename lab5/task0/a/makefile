
all: exec

exec: myshell.o LineParser.o

	gcc -g -m32 -Wall -o myshell myshell.o	

myshell.o: myshell.c
	gcc -m32 -Wall -c myshell.c -o myshell.o

LineParser.o: LineParser.c
	gcc -m32 -Wall -c LineParser.c -o myshell.o
	
.PHONY: clean
clean:
	rm -f *.o myshell

