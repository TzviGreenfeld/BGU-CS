#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void PrintHex(unsigned char* buffer, int length){
    int i;
    for (i = 0; i < strlen((char*)buffer); i++) {
        printf("%02X ", buffer[i]);
    }
    printf("\n");
    free(buffer);
}

int main(int argc, char *argv[])
{

FILE* fp = fopen("signatures", "r");
    fseek(fp, 0, SEEK_END);
    int sz = ftell(fp); 
    fseek(fp, 0, SEEK_SET);
    unsigned char* buffer = malloc(sz*sizeof(char));
    fread(buffer, sz, sizeof(char), fp);
    PrintHex(buffer, sz);

    return 0;
}