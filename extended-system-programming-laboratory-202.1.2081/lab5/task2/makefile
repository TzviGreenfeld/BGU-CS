
all: exec

exec: task2.o LineParser.o looper.o
	clear
	gcc -g -m32 -Wall -o myshell task2.o LineParser.o
	gcc -g -m32 -Wall -o looper looper.o	

task2.o: task2.c
	gcc -m32 -Wall -c task2.c -o task2.o

LineParser.o: LineParser.c
	gcc -m32 -Wall -c LineParser.c -o LineParser.o

looper.o: looper.c
	gcc -m32 -Wall -c looper.c -o looper.o

.PHONY: clean
clean:
	clear
	rm -f *.o myshell looper

.PHONY: clearALL
clearALL:
	pkill -f looper
