#include <stdio.h>
#include <string.h>
#include <stdlib.h>

typedef struct virus
{
    unsigned short SigSize;
    unsigned char *sig;
    char virusName[16];
} virus;

/*----------1a---------*/
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
    if (vir == 0)
    {
        printf("null vir\n");
        return;
    }
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

void printAllViruses()
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
/*---------------------*/

/*----------1b---------*/
typedef struct link link;
struct link
{
    link *nextVirus;
    virus *vir;
};

void list_print(link *virus_list, FILE *output)
{

    while (virus_list != NULL)
    {
        printVirus(virus_list->vir, output);
        virus_list = virus_list->nextVirus;
    }
}

// TODO: test this function!
link *list_append(link *virus_list, link *to_add)
{
    virus_list->nextVirus = to_add;
    virus_list = to_add;
    return virus_list;
    // int addFirst = 1;
    // if (addFirst)
    // {
    //     // add as head
    //     to_add->nextVirus = virus_list;
    //     return (to_add);
    // }
    // else
    // {
    //     // add as tail
    //     link *lastLink = virus_list;
    //     do
    //     {
    //         lastLink = lastLink->nextVirus;
    //     } while (lastLink->nextVirus != NULL);
    //     lastLink->nextVirus = to_add;
    //     return virus_list;
    // }
}

void list_free(link *virus_list)
{
    // free list pointers recursively
    if (virus_list == NULL)
        return;
    if (virus_list->vir != NULL)
    {
        free(virus_list->vir->sig);
        free(virus_list->vir);
    }
    list_free(virus_list->nextVirus);
    free(virus_list);
}

void test1b()
{
    FILE *file = fopen("signatures", "rb");
    link *virList;
    virList = malloc(sizeof(link));
    link *head = virList;
    head->vir = NULL;
    link *currLink = head;
    while (!feof(file))
    {
        virus *vir = malloc(sizeof(virus));
        readVirus(vir, file);
        if (!vir)
        {
            link *l = malloc(sizeof(link));
            l->vir = vir;
            currLink = list_append(currLink, l);
        }
    }
    virList = head;
    list_print(virList, stdout);
    fclose(file);
}
/*---------------------*/
int main()
{
    // printAllViruses();
    test1b();
}
