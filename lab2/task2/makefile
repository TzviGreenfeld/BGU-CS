
all: exec

exec: menu_map.o

	gcc -g -m32 -Wall -o menu_map menu_map.o	

menu_map.o: menu_map.c
	gcc -m32 -Wall -c menu_map.c -o menu_map.o


.PHONY: clean
clean:
	rm -f *.o menu_map

