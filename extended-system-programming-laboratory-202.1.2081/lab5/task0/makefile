
all: exec

exec: myshell.o LineParser.o looper.o
	gcc -g -m32 -Wall -o myshell myshell.o LineParser.o
	gcc -g -m32 -Wall -o looper looper.o	

myshell.o: myshell.c
	gcc -m32 -Wall -c myshell.c -o myshell.o

LineParser.o: LineParser.c
	gcc -m32 -Wall -c LineParser.c -o LineParser.o

looper.o: looper.c
	gcc -m32 -Wall -c looper.c -o looper.o

.PHONY: clean
clean:
	rm -f *.o myshell looper

