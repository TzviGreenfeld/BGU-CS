#include<stdio.h>
#include<string.h>
#include<stdbool.h>

int main(int argc, char* argv[]){
	// parsing arguments
	bool DEBUG = false;
	
	int i;
	for(i=1; i<argc; i++){
		if(strcmp(argv[i],"-D") == 0)		
			DEBUG = true;
		}
	// input processing, single char per iteration
	int numOfLetters = 0;
	char c;
	while( (c = fgetc(stdin)) != EOF ){
		if (DEBUG){	
			fprintf(stderr, "%d %d\n",c, '.');
		}

		if ( (c >= 65 ) & ( c <= 90 ) )	{
			numOfLetters++;
			printf(".");	
		}else {
			printf("%c", c);
		}
	}

	if (DEBUG){
		printf("the number of letters: %d\n", numOfLetters);
	}
return 0;
}
