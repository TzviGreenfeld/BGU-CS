all: exec

exec: skeleton.o
	ld -m elf_i386 skeleton.o -o task2b

skeleton.o: skeleton.s
	nasm -f elf32 skeleton.s -o skeleton.o


.PHONY: clean
clean: 
	rm -f *.o task2b