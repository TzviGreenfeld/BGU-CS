#include <stdlib.h>
#include <stdio.h>
#include <string.h>

char encrypt(char c);
char decrypt(char c);
char dprt(char c);
char cprt(char c);
char my_get(char c);
char quit(char c);
char censor(char c)
{
	if (c == '!')
		return '*';
	else
		return c;
}

char *map(char *array, int array_length, char (*f)(char))
{
	char *mapped_array = (malloc(array_length * sizeof(char)));
	int i;
	for (i = 0; i < array_length - 1; i++)
	{
		mapped_array[i] = (f)(array[i]);
	}
	mapped_array[i] = 0;
	return mapped_array;
}

int main(int argc, char **argv)
{
	char str[] = "Hello Worold!";
	char *mapped = map(str, sizeof(str) / sizeof(str[0]), censor);
	printf("original: %s\nnew: %s\n", str, mapped);
	free(mapped);

	char c = 'A';
	printf("%c encrypt %c\n", c, encrypt(c));
	dprt('A');
	quit('q');
	printf("hi");

	return 0;
}

char encrypt(char c){
	if ( ('A' <= c) && (c <= 'z') ) {
		return c+2;
	} else{
		return c;
	}
}

char decrypt(char c){
	if ( ('A' <= c) && (c <= 'z') ) {
		return c-2;
	} else{
		return c;
	}
}
char dprt(char c){
	printf("%d\n", c);
	return c;
}

char cprt(char c){
	if ( ('A' <= c) && (c <= 'z') ) {
		printf("%d\n", c);
	} else{
		printf("*\n");
	}
	return c;
}

char my_get(char c){
	return(fgetc(stdin));
}

char quit(char c){
	if (c == 'q'){
		exit(0);
	}
	else{
		return c;
	}
}
