
all: exec

exec: task2b.o

	gcc -g -m32 -Wall -o task2b task2b.o	

task2b.o: task2b.c
	gcc -m32 -Wall -c task2b.c -o task2b.o

.PHONY: vgrind
vgrind:
	valgrind --leak-check=full task2b


.PHONY: clean
clean:
	rm -f *.o task2b

