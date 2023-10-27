
all: exec

exec: task2.o
	gcc -g -m32 -Wall -o myELF task2.o	

task2.o: task2.c
	gcc -m32 -Wall -c task2.c -o task2.o


.PHONY: clean
clean:
	rm -f *.o myELF

