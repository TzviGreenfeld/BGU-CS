#include <stdio.h>
#include <string.h>
#include <stdlib.h>

typedef struct virus
{
    unsigned short SigSize;
    unsigned char *sig;
    char virusName[16];
} virus;

void readVirus(virus *vir, FILE *input)
{
    short *size = malloc(sizeof(short));
    if (fread(size, sizeof(short), 1, input) != 0)
    {
        char *sig = malloc(*size);
        fread(sig, sizeof(char), *size, input);
        char virName[16];
        fread(virName, sizeof(char), 16, input);
        vir->SigSize = *size;
        vir->sig = sig;
        strcpy(vir->virusName, virName);
        free(size);
    }
    else
    {
        free(size);
        free(vir);
    }
}

void printVirus(virus *vir, FILE *output)
{
    int LINE_LEN = 20;
    fprintf(output, "Virus name: %s\n", vir->virusName);
    fprintf(output, "Virus size: %d\n", vir->SigSize);
    fprintf(output, "signature:\n");

    int i;
    for (i = 0; i < vir->SigSize; i++)
    {
        fprintf(output, "%02hhX ", (unsigned int)((vir->sig)[i]));
        if (i % LINE_LEN == LINE_LEN - 1)
        {
            fprintf(output, "\n");
        }
    }
    if (i % LINE_LEN != 0)
    {
        fprintf(output, "\n");
    }
    fprintf(output, "\n");
}

int main()
{

    virus *vir = malloc(sizeof(virus));
    FILE *file = fopen("signatures", "rb");
    while (vir)
    {
        readVirus(vir, file);
        if (vir->SigSize == 0)
        {
            fclose(file);
            exit(0);
        }
        printVirus(vir, stdout);
    }
}
