all: exec

exec: encoder.o
	gcc -m32 -Wall -g -o encoder encoder.o

encoder.o: encoder.c
	gcc -m32 -Wall -g -c -o encoder.o encoder.c

.PHONY: clean

clean:
	rm *.o encoder
