#include <stdlib.h>
#include <stdio.h>
#include <string.h>

void test();
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
	for (i = 0; i < array_length; i++)
	{
		mapped_array[i] = (f)(array[i]);
	}
	mapped_array[i] = 0;
	return mapped_array;
}

int main(int argc, char **argv)
{

	// test();
	int base_len = 5;
	char arr1[base_len];
	char* arr2 = map(arr1, base_len, my_get);
	char* arr3 = map(arr2, base_len, encrypt);
	char* arr4 = map(arr3, base_len, dprt);
	char* arr5 = map(arr4, base_len, decrypt);
	char* arr6 = map(arr5, base_len, cprt);
	free(arr2);
	free(arr3);
	free(arr4);
	free(arr5);
	free(arr6);
	return 0;
}

char encrypt(char c){
	// 0x41 and 0x7a
	if ( (0x41 <= c) && (c <= 0x7a) ) {
		return c+2;
	} else{
		return c;
	}
}

char decrypt(char c){
	if ( (0x41 <= c) && (c <= 0x7a) ) {
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
	if ( (0x41 <= c) && (c <= 0x7a) ) {
		printf("%c\n", c);
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

void test()
{
	// tests:
	printf("encrypt: %d\n", encrypt('a') == 'c');
	printf("encrypt: %d\n", encrypt('!') == '!');
	printf("decrypt: %d\n", decrypt('c') == 'a');
	printf("decrypt: %d\n", decrypt('!') == '!');
	printf("should print 99:\n");
	printf("dprt: %d\n", dprt('c') == 'c');
	printf("should print c:\n");
	printf("cprt: %d\n", cprt('c') == 'c');
	printf("should print *:\n");
	printf("cprt: %d\n", cprt('!') == '!');
	printf("my_get: should print the entered char:\n");
	printf("%c\n", my_get('c'));
}