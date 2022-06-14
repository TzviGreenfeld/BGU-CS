
all: exec

exec: task1.o
	gcc -g -m32 -Wall -o myELF task1.o	

task1.o: task1.c
	gcc -m32 -Wall -c task1.c -o task1.o


.PHONY: clean
clean:
	rm -f *.o myELF

