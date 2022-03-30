#include<stdio.h>
#include<string.h>
#include<stdbool.h>

void printDebug(char origin, char replaced);

int main(int argc, char* argv[]){
	// parsing arguments
	bool DEBUG = false;
	
	int i;
	for(i = 1; i < argc; i++){
		if(strcmp(argv[i],"-D") == 0)		
			DEBUG = true;
		}
	// input processing, single char per iteration
	int numOfLetters = 0;
	char c;
	while( (c = fgetc(stdin)) != EOF ){
		if ( (c >= 'A' ) & ( c <= 'Z' ) ){
			printDebug(c, '.');
			numOfLetters++;
			printf(".");	
		}else {
			printDebug(c, c);
			printf("%c", c);
		}
	}

	if (DEBUG){
		fprintf(stderr, "the number of letters: %d\n", numOfLetters);
	}
return 0;
}

void printDebug(char origin, char replaced){
	fprintf(stderr, "%d %d\n", origin, replaced);
} 