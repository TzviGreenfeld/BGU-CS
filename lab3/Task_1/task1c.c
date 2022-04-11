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
    int c = fread(vir, 18, 1, input);
    if (c == '\n')
    {
        free(vir);
    }
    else
    {
        vir->sig = (unsigned char *)malloc(vir->SigSize);
        fread(vir->sig, 1, vir->SigSize, input); 
        ( vir->sig[0] | vir->sig[1] ) << 8;
    }
    return;
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
        fprintf(output, "%02hhx ", (unsigned int)((vir->sig)[i]));
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
    virus *newVirus = (virus *)malloc(sizeof(virus));
    readVirus(newVirus, fopen("signatures", "rb"));
    printVirus(newVirus, stdout);
}
