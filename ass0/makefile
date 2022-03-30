all: exec

exec: add.o numbers.o main.o
	gcc -g -m32 -Wall -o main add.o numbers.o main.o


add.o: add.s
	nasm -g -f elf -w+all -o add.o add.s


main.o: main.c
	gcc -g -m32 -Wall -c -o main.o main.c


numbers.o: numbers.c	
	gcc -g -m32 -Wall -c -o numbers.o numbers.c


.PHONY: clean
Clean:
	rm -f *.o main
