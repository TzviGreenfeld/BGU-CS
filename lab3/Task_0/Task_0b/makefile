
all: exec

exec: hexaPrint.o

	gcc -g -m32 -Wall -o hexaPrint hexaPrint.o	

hexaPrint.o: hexaPrint.c
	gcc -m32 -Wall -c hexaPrint.c -o hexaPrint.o


.PHONY: clean
clean:
	rm -f *.o hexaPrint

