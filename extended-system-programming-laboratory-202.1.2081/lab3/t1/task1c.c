#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct virus
{
    unsigned short SigSize;
    unsigned char *sig;
    char virusName[16];
} virus;

typedef struct link link;
struct link
{
    link *nextVirus;
    virus *vir;
};

struct fun_desc
{
    char *name;

    char (*function)();
};

void detect_virus(char *buffer, unsigned int size, link *virus_list);

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
    FILE *file = fopen("/users/studs/bsc/2022/tzvigree/Desktop/LAB3/signatures", "rb");
    while (vir)
    {
        readVirus(vir, file);
        if (vir->SigSize == 0)
        {
            printf("virus sigsize is 0");
            fclose(file);
            exit(0);
        }
        printVirus(vir, stdout);
    }
}
/*---------------------*/

/*----------1b---------*/
void list_print(link *virus_list, FILE *output)
{

    while (virus_list != 0)
    {
        printVirus(virus_list->vir, output);
        virus_list = virus_list->nextVirus;
    }
}

link *list_append(link *virus_list, link *to_add)
{
    if (virus_list == 0){
        
        return to_add;
    }
    virus_list->nextVirus = to_add;

    virus_list = to_add;



    return virus_list;
}

// testing 1b

void loadSignature(link *virList)
{
    printf("enter file name:\n");
    char line[256];
    fgets(line, 256 * sizeof(char), stdin);
    char fileName[256];
    sscanf(line, "%s", fileName);

    FILE *sigFile = fopen(fileName, "rb");
    // FILE *sigFile = fopen("signatures", "rb");

    if (!sigFile)
    {
        return;
    }
    // init
    link *head = virList;
    link *currLink = head;
    head->vir = NULL;
    while (!feof(sigFile))
    {
        // read viruses
        virus *currVir = malloc(sizeof(virus));
        readVirus(currVir, sigFile);
        if (currVir->SigSize != 0)
        {
            // there is another virus to read, put it a new link and append to the list
            link *toAppend = malloc(sizeof(link));
            toAppend->vir = currVir;
            currLink = list_append(currLink, toAppend);
        }
    }
    virList = head;
    fclose(sigFile);
}

void printSignature(link *virList)
{
    list_print(virList, stdout);
}

char quit(char c)
{
    if (c == 'q')
    {
        exit(0);
    }
    else
    {
        return c;
    }
}

void test1b()
{
    link *virList = malloc(sizeof(link));

    struct fun_desc menu[] = {
        {"Load signatures", &loadSignature},
        {"Print signatures", &printSignature},
        {"Detect viruses", &detect_virus},
        {"Quit", &quit},
        {NULL, NULL}};
    int bound = sizeof(menu) / sizeof(menu[0]) - 1;

    while (1)
    {
        // validate input and handle invalid
        printf("Choose function:\n");
        for (unsigned int i = 0; i < bound; i++)
        {
            printf("%d) %s\n", i + 1, (menu + i)->name);
        }
        char in[20];
        fgets(in, 20, stdin);
        int userChoice = atoi(in);
        if (userChoice == 0 && strcmp(in, "0\n") != 0)
        {
            // printf("err");
        }
        else
        {
            printf("Option: %d\n", userChoice);
            if (userChoice < 0 || userChoice > bound)
            {
                printf("Not within bounds\n");
                return;
            }
        }
        // valid input, handle functions:
        printf("Within bounds\n");
        if (userChoice == 1 || userChoice == 2)
        {
            // load/print signatures
            ((menu + userChoice - 1)->function)(virList);
        }
        else if (userChoice == 3)
        {
            // detect virus
            // get fileName and open it
            printf("enter file name:\n");
            char line[256];
            fgets(line, 256 * sizeof(char), stdin);
            char fileName[256];
            sscanf(line, "%s", fileName);
            FILE *suspiciousFile = fopen(fileName, "rb");
            if (!suspiciousFile)
            {
                return;
            }
            // read to buffer
            char *buffer = malloc(10000);
            int bytesRead = fread(buffer, sizeof(char), 10000, suspiciousFile);

            loadSignature(virList);
            detect_virus(buffer, bytesRead, virList);
            free(buffer);
            fclose(suspiciousFile);
        }
        else if (userChoice == 4)
        {
            // quit
            quit('q');
        }

        printf("%s\n\n", "Done");
    }
}
/*---------------------*/

/*----------1c---------*/
void detect_virus(char *buffer, unsigned int size, link *virus_list)
{
    link *currLink;
    for (int i = 0; i < size; i++)
    {
        currLink = virus_list;
        while (currLink != 0)
        {
            if (!(currLink->vir == 0 || (currLink->vir)->SigSize == 0 || currLink->vir->SigSize > size - i))
            {
                if (memcmp(currLink->vir->sig, &buffer[i], currLink->vir->SigSize) == 0)
                {
                    virus *detectedVirus = currLink->vir;
                    printf("starting byte location in the suspected file: %d\n", i);
                    printf("virus name: %s\n", detectedVirus->virusName);
                    printf("size of the virus signature: %d\n\n", detectedVirus->SigSize);
                }
            }
            currLink = currLink->nextVirus;
        }
    }
}
/*---------------------*/
int main()
{
 test1b();
}
