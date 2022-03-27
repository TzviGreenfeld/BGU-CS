all: exec

exec: encoder.o
	gcc -g -m32 -Wall -o encoder encoder.o	

encoder.o: encoder.c
	gcc -m32 -Wall -c -nostdlib -fno-stack-protector encoder.c -o encoder.o


.PHONY: clean
clean:
	rm -f *.o encoder
