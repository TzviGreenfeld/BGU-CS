
all: exec

exec: task1.o LineParser.o

	gcc -g -m32 -Wall -o myshell task1.o LineParser.o

task1.o: task1.c
	gcc -m32 -Wall -c task1.c -o task1.o

LineParser.o: LineParser.c
	gcc -m32 -Wall -c LineParser.c -o LineParser.o


.PHONY: clean
clean:
	rm -f *.o myshell

