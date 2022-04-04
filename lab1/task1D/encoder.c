#include<stdio.h>
#include<string.h>
#include<stdbool.h>


int* parseKey( char key[] );
int printUnEncrypted(char currChar, bool DEBUG, FILE *outStream);
void printDebug(char origin, char replaced);

int main(int argc, char* argv[]){
	// flags
	bool DEBUG = false, ENCRYPT = false, IN_FILE = false, OUT_FILE = false;
	int *key;
	FILE *inStream = stdin;
	FILE *outStream = stdout;	

	
	// parsing arguments
	int i;
	for(i=1; i<argc; i++){
		if (strcmp(argv[i],"-D") == 0)		
			DEBUG = true;
		if (argv[i][1] == 'e'){
			ENCRYPT = true;
			key = parseKey(argv[i]);
		}
		if ( (argv[i][1] == 'i') ){

			
			// get substring
			int nameLen = strlen(argv[i]) - 2;
			char fileName[nameLen];
			int j;
			for (j = 0; j < nameLen; j++){
				fileName[j] = argv[i][j+2];
			}
			fileName[j] = '\0';
				
			// input file	
			if (argv[i][1] == 'i'){	
				IN_FILE = true;
				inStream = fopen(fileName, "r");
			
				if (inStream  == NULL){
					fprintf(stderr, "[ERROR] could not open file\n");
					return 1; 	
				}
			}
		}
	}
	// input processing, single char per iteration
	char c, firstChar;
 	int numOfLetters = 0;	
	int currCharIndex = 1;
	while( (c = fgetc(inStream)) != EOF ){
		if(!ENCRYPT)
			numOfLetters += printUnEncrypted(c, DEBUG, outStream);
		if(ENCRYPT){
			bool keyPlus = false, keyMinus = false;
			if (key[0] == 1){
				keyPlus = true;
			} else {
				keyMinus = true;
			}
			if ( keyPlus & (currCharIndex == 1) ){
				// saving char that needs to be repeated as suffix
				firstChar = c;
				fprintf(outStream, "%c", c);
			} else if ( keyPlus & (c == '\n')){
				// the char is \n and we need to repeat the first char
				int i;
				for (i = 0; i < key[1]; i++){
					fprintf(outStream, "%c", firstChar);
				}
				currCharIndex = 0;
				fprintf(outStream, "\n");
			} else if ( keyMinus & (currCharIndex <= key[1]) ){
				// do nothing, these are the chars that we need to ommit
				if (c == 10){
				currCharIndex = 0;
				fprintf(outStream, "\n");
				}
			} else if ( keyMinus & (c == '\n') ){
				// the char is \n, go to the next line of input
				currCharIndex = 0;
				fprintf(outStream, "\n");
			} else{
				fprintf(outStream, "%c", c);
			}

			
		}
		currCharIndex++;
	}
	if (DEBUG){
		fprintf(stderr, "the number of letters: %d\n", numOfLetters);
	}
	if (IN_FILE){
		fclose(inStream);
	}
	if(OUT_FILE){
		fclose(outStream);
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
	if ( (key[2] >= '1') & (key[2] <= '9') ){
		output[1] = key[2] - 48;	
	}
	// A-F
	 else if ( (key[2] >= 'A') & (key[2] <= 'Z') ){
	output[1] = key[2] - 55;
	}
	

	return output;
}


int printUnEncrypted(char currChar, bool DEBUG, FILE *outStream){
// replacing only capital letters
	int numOfLetters = 0;
	if(currChar == '\n'){
		fprintf(outStream, "\n");
		return 0;
	}
	if ( ( currChar >= 'A' ) & ( currChar <= 'Z' ) ){
		// is capital
		if (DEBUG){
			printDebug(currChar, '.');
		}
		numOfLetters++;
		fprintf(outStream, ".");	
	}else {
		if (DEBUG){
			printDebug(currChar, currChar);
			}
		fprintf(outStream, "%c", currChar);
	}

	return numOfLetters;
}
