
all: exec

exec: task2.o LineParser.o

	gcc -g -m32 -Wall -o myshell task2.o LineParser.o

task2.o: task2.c
	gcc -m32 -Wall -c task2.c -o task2.o

LineParser.o: LineParser.c
	gcc -m32 -Wall -c LineParser.c -o LineParser.o


.PHONY: clean
clean:
	rm -f *.o myshell

