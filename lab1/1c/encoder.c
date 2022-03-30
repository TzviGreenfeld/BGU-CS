#include<stdio.h>
#include<string.h>
#include<stdbool.h>

int* parseKey( char key[] );
int printUnEncrypted(char currChar, bool DEBUG);
void printDebug(char origin, char replaced);

int main(int argc, char* argv[]){
	// parsing arguments
	bool DEBUG = false;
	bool ENCRYPT = false;
	int i;
	int * key;

	for(i=1; i<argc; i++){
		if (strcmp(argv[i],"-D") == 0)		
			DEBUG = true;
		if (argv[i][1] == 'e'){
			ENCRYPT = true;
			key = parseKey(argv[i]);
		}
	}
	// input processing, single char per iteration
	char c, firstChar;
 	int numOfLetters = 0;	
	int currCharIndex = 1;
	while( (c = fgetc(stdin)) != EOF ){

		if(!ENCRYPT)
			numOfLetters += printUnEncrypted(c, DEBUG);
		if(ENCRYPT){
			bool keyPlus = false, keyMinus = false;
			if (key[0] == 1){
				keyPlus = true;
			} else {
				keyMinus = true;
			}

			if ( keyPlus & (currCharIndex == 1)){
				// saving first char to print at the end
				if (DEBUG){	
					printDebug(c, c);
				}
				firstChar = c;	
				printf("%c", c);
			} else if ( keyPlus & (c == '\n') ){
				// c is \n and we need to add letters at the end
				int i;
				for (i = 0; i < key[1]; i++){
					printf("%c", firstChar);
				}
				currCharIndex = 0;
				printf("\n");
			} else if ( keyMinus & (currCharIndex <= key[1]) ){
				// do nothing
			} else if ( keyMinus & (c == 10) ){
				currCharIndex = 0;
				printf("\n");
			} else{
				printf("%c", c);
			}

			
		}
		currCharIndex++;
	}
	if (DEBUG){
		printf("the number of letters: %d\n", numOfLetters);
	}

	return 0;
}

void printDebug(char origin, char replaced){
	fprintf(stderr, "%d %d\n", origin, replaced);
} 

int* parseKey( char key[] ){
	// returns array of length 2
	// 	first array item:  1 for plus and -1 for minus
	//	second array item: number of letters to add/ subtract
	static int output[2];
	if (key[0] == '+'){
		output[0] = 1;
	} else if (key[0] == '-'){
		output[0] = -1;
	}
	// 1-9
	if ( (key[2] >= 48) & (key[2] <= 57) ){
		output[1] = key[2] - 48;	
	}
	// A-F
	 else if ( (key[2] >= 65) & (key[2] <= 70) ){
	output[1] = key[2] - 55;
	}
	

	return output;
}


int printUnEncrypted(char currChar, bool DEBUG){
// replacing only capital letters
	int numOfLetters = 0;
	if(currChar == 10){
	// currChar is \n
		printf("\n");
		return 0;
	}
	if ( ( currChar >= 'A' ) & ( currChar <= 'Z' ) ){
		if (DEBUG){
			printDebug(currChar, '.');
		}
		numOfLetters++;
		printf(".");	
	}else {
		if (DEBUG){
			printDebug(currChar, currChar);
			}
		printf("%c", currChar);
	}

	return numOfLetters;
}

















