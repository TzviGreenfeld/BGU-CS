
all: exec

exec: task0b.o

	gcc -g -m32 -Wall -o myELF task0b.o	

task0b.o: task0b.c
	gcc -m32 -Wall -c task0b.c -o task0b.o


.PHONY: clean
clean:
	rm -f *.o myELF

