all: exec

exec: addresses.o
	gcc -g -m32 -Wall -o addresses addresses.o	

addresses.o: addresses.c
	gcc -m32 -Wall -c addresses.c -o addresses.o


.PHONY: clean
clean:
	rm -f *.o addresses

