
all: exec

exec: count.o util.o start.o
	ld -m elf_i386 start.o count.o util.o -o count

count.o: count.c
	gcc -m32 -Wall -ansi -c -nostdlib -fno-stack-protector count.c -o count.o

util.o: util.c util.h
	gcc -m32 -Wall -ansi -c -nostdlib -fno-stack-protector util.c -o util.o

start.o: start.s
	nasm -f elf32 start.s -o start.o

.PHONY: clean
clean:
	rm -f *.o count

