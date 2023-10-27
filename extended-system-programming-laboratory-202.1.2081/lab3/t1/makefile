
all: exec

exec: task1c.o

	gcc -g -m32 -Wall -o task1c task1c.o	

task1c.o: task1c.c
	gcc -m32 -Wall -c task1c.c -o task1c.o

.PHONY: vgrind
vgrind:
	valgrind --leak-check=full task1c


.PHONY: clean
clean:
	rm -f *.o task1c

