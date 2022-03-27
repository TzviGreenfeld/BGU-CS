#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(int argc, char *argv[]){
	int i;
	int j;
	puts("Hello World");
	for( i = 0; i < argc; ++i){
		char* currWord = "";
		strcpy(currWord, argv[i]);
		// for ( j = 0; j < strlen(currWord) -1; ++j){
		// 	int currAsciiVal =  currWord[j];
		// 	printf("%d", currAsciiVal);
		// } 

	}
	

	return 0;
}

