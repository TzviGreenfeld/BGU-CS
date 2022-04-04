
all: exec

exec: main.o

	gcc -g -m32 -Wall -o main main.o	

main.o: main.c
	gcc -m32 -Wall -c main.c -o main.o


.PHONY: clean
clean:
	rm -f *.o main

