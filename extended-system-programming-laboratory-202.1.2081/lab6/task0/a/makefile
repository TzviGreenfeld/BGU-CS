
all: exec

exec: mypipe.o

	gcc -g -m32 -Wall -o mypipe mypipe.o	

mypipe.o: mypipe.c
	gcc -m32 -Wall -c mypipe.c -o mypipe.o


.PHONY: clean
clean:
	rm -f *.o mypipe

