#include <stdlib.h>
#include <stdio.h>
#include <string.h>

char censor(char c)
{
	if (c == '!')
		return '*';
	else
		return c;
}
char encrypt(char c);
char decrypt(char c);
char dprt(char c);
char cprt(char c);
char my_get(char c);
char quit(char c);
void test();

char *map(char *array, int array_length, char (*f)(char))
{
	char *mapped_array = (malloc(array_length * sizeof(char)));
	for (int i = 0; i < array_length; i++)
	{
		mapped_array[i] = (f)(array[i]);
	}

	return mapped_array;
}

struct fun_desc
{
	char *name;
	char (*function)(char c);
};

int main(int argc, char **argv)
{
	// test();

	char *carray = malloc(5 * sizeof(char));

	struct fun_desc menu[] = {
		{"Censor", &censor},
		{"Encrypt", &encrypt},
		{"Decrypt", &decrypt},
		{"Print dec", &dprt},
		{"Print string", &cprt},
		{"Get string", &my_get},
		{"Quit", &quit},
		{NULL, NULL}};
	int bound = sizeof(menu) / sizeof(menu[0]) - 1;

	
	while (1)
	{
		printf("Choose function:\n");
		for (unsigned int i = 0; i < bound; i++)
		{
			printf("%d) %s\n", i, (menu + i)->name);
		}
		char in[20];
		fgets(in, 20, stdin);
		int userChoice = atoi(in);
		if (userChoice == 0 && strcmp(in, "0\n") != 0)
		{
			printf("err");
		}
		else
		{
			printf("Option: %d\n", userChoice);
			if (userChoice < 0 || userChoice > bound)
			{
				printf("Not within bounds\n");
				return 0;
			}
		}

		printf("Within bounds\n");
		char *prevInput = carray;
		carray = map(carray, 5, (menu + userChoice)->function);
		printf("%s\n\n", "Done");
		free (prevInput);
	}

	free(menu);
	return 0;
}

char encrypt(char c)
{
	if ((0x41 <= c) && (c <= 0x7a))
	{
		return c + 2;
	}
	else
	{
		return c;
	}
}

char decrypt(char c)
{
	if ((0x41 <= c) && (c <= 0x7a))
	{
		return c - 2;
	}
	else
	{
		return c;
	}
}
char dprt(char c)
{
	printf("%d\n", c);
	return c;
}

char cprt(char c)
{
	if ((0x41 <= c) && (c <= 0x7a))
	{
		printf("%c\n", c);
	}
	else
	{
		printf("*\n");
	}
	return c;
}

char my_get(char c)
{
	char in = fgetc(stdin);
	return (in);
}

char quit(char c)
{
	if (c == 'q')
	{
		exit(0);
	}
	else
	{
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