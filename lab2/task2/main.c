#include <stdlib.h>
#include <stdio.h>
#include <string.h>

char encrypt(char c); /* Gets a char c and returns its encrypted form by adding 2 to its value.
		  If c is not between 0x41 and 0x7a it is returned unchanged */
char decrypt(char c); /* Gets a char c and returns its decrypted form by reducing 2 to its value.
			If c is not between 0x41 and 0x7a it is returned unchanged */
char dprt(char c);	  /* dprt prints the value of c in a decimal representation followed by a
			  new line, and returns c unchanged. */
char cprt(char c);	  /* If c is a number between 0x41 and 0x7a, cprt prints the character of ASCII value c followed
					   by a new line. Otherwise, cprt prints the dot ('*') character. After printing, cprt returns
					   the value of c unchanged. */
char my_get(char c);  /* Ignores c, reads and returns a character from stdin using fgetc. */

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
}

char cprt(char c){
	if ( ('A' <= c) && (c <= 'z') ) {
		printf("%d\n", c);
	} else{
		printf("*\n");
	}
}

char my_get(char c){
	return(fgetc(stdin));
}