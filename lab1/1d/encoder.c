#include<stdio.h>
#include<string.h>
#include<stdbool.h>

int* parseKey( char key[] );
int printUnEncrypted(char currChar, bool DEBUG, FILE *outStream);

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
		if ( (argv[i][1] == 'i') || (argv[i][1] == 'o') ){

			
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
			
			// output file
			if (argv[i][1] == 'o'){
		
				OUT_FILE = true;
				outStream = fopen(fileName, "w");
			
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
			if ( (currCharIndex == 1) & (key[0] == 1) ){
				// saving char that needs to be repeated as suffix
				firstChar = c;
				fprintf(outStream, "%c", c);
			} else if ( (c == 10) & (key[0] == 1) ){
				// the char is \n and we need to repeat the first char
				int i;
				for (i = 0; i < key[1]; i++){
					fprintf(outStream, "%c", firstChar);
				}
				currCharIndex = 0;
				fprintf(outStream, "\n");
			} else if ( (key[0] == -1) & (currCharIndex <= key[1]) ){
				// do nothing, these are the chars that we need to ommit
				if (c == 10){
				currCharIndex = 0;
				fprintf(outStream, "\n");
				}
			} else if ( (key[0] == -1) & (c == 10) ){
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


int printUnEncrypted(char currChar, bool DEBUG, FILE *outStream){
// replacing only capital letters
	int numOfLetters = 0;
	if(currChar == 10){
	// currChar is \n
		fprintf(outStream, "\n");
		return 0;
	}
	if ( ( currChar >= 65 ) & ( currChar <= 90 ) ){
		// is capital
		if (DEBUG){
			fprintf(stderr, "%d %d\n",currChar, '.');
		}
		numOfLetters++;
		fprintf(outStream, ".");	
	}else {
		if (DEBUG){
			fprintf(stderr, "%d %d\n",currChar, currChar);
			}
		fprintf(outStream, "%c", currChar);
	}

	return numOfLetters;
}
