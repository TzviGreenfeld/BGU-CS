all: exec

exec: main.o
	gcc -m32 -g -Wall -o my_echo main.o

main.o: main.c
	gcc -m32 -g -Wall -c main.c -o main.o

.PHONY: clean
clean:
	rm *.o my_echo	
