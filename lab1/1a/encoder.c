#include<stdio.h>
#include<string.h>
#include<stdbool.h>

int main(int argc, char* argv[]){

	// input processing, single char per iteration
	char c;
	while( (c = fgetc(stdin)) != EOF ){
		if ( (c >= 'A' ) & ( c <= 'Z' ) )	{
			numOfLetters++;
			printf(".");	
		}else {
			printf("%c", c);
		}
	}

return 0;
}
