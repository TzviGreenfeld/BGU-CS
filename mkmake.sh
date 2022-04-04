#!/bin/bash
# generates c makfiel for single file program

txt="
all: exec

exec: $1.o

	gcc -g -m32 -Wall -o $1 $1.o	

$1.o: $1.c
	gcc -m32 -Wall -c $1.c -o $1.o


.PHONY: clean
clean:
	rm -f *.o $1
"

echo "$txt" > "$2/makefile"
