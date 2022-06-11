#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>
#include <fcntl.h>
#include <elf.h>
#include <sys/mman.h>
#include <sys/stat.h>

// constants
#define FALSE 0
#define TRUE 1
#define MAX_BUFF 32

// structs
typedef struct
{
   char *name;
   void (*fun)();
} fun_desc;

// functions
void presentOptions();
void toggleDebugMode();
void examineELFFile();
void printSectionNames();
void printSymbols();
void quit();
int isOutOfBounds(int option);
void mapFile();
void printElfHeader(Elf32_Ehdr *hdr);
int isELF(Elf32_Ehdr *hdr);
int takeUserChoice();

// globals
int DEBUG = FALSE;
int Currentfd = -1;
fun_desc menu[] = {
    {"Toggle Debug Mode", toggleDebugMode},
    {"Examine ELF File", examineELFFile},
    {"Print Section Names", printSectionNames},
    {"Print Symbols", printSymbols},
    {"Quit", quit},
    {NULL, NULL}};
struct stat fstat_buff;
void *mapBeginPtr;
Elf32_Ehdr *ELFheader;

int main()
{
   system("clear");
   while (1)
   {
      presentOptions();
      int option = takeUserChoice();
      if (option != -1)
      {
         menu[option].fun();
      }
      printf("\n");
   }
}

int isOutOfBounds(int option) { return (option < 0) || (5 <= option); }
int takeUserChoice()
{
   int option;
   scanf("%d", &option);
   if (isOutOfBounds(option))
   {
      printf("Out of bounds\n");
      return -1;
   }
   printf("\n");
   return option;
}
void presentOptions()
{
   printf("functions:\n");
   for (int i = 0; menu[i].name != NULL; i++)
   {
      printf("%d-%s\n", i, menu[i].name);
   }
   printf("Option: ");
}

void toggleDebugMode()
{
   DEBUG = !DEBUG;
   DEBUG ? printf("Debug ON\n") : printf("Debug OFF\n");
}

int isELF(Elf32_Ehdr *hdr) { return memcmp(hdr->e_ident, ELFMAG, SELFMAG) == 0; }
void examineELFFile()
{
   // open file if valid ELF print else cleanup
   printf("open file: ");
   mapFile();
   ELFheader = (Elf32_Ehdr *)mapBeginPtr;
   if (isELF(ELFheader))
   {
      printElfHeader(ELFheader);
   }
   else
   {
      printf("Error: not an ELf file\n");
      munmap(mapBeginPtr, fstat_buff.st_size);
      close(Currentfd);
      Currentfd = 0;
   }
}
void printSectionNames()
{
   printf("%s\n", "Not Implemented yet");
}
void printSymbols()
{
   printf("%s\n", "Not Implemented yet");
}
void quit()
{
   exit(0);
}

void mapFile()
{
   // get filename
   char filePath[MAX_BUFF];
   scanf("%s", filePath);
   // open and handle errors
   int fd = open(filePath, O_RDWR);
   if (fd < 0)
   {
      printf("Could not open file %s\n", filePath);
      exit(1);
   }

   // read file stat
   int fs = fstat(fd, &fstat_buff);
   if (fs != 0)
   {
      printf("Error while trying to read file stat with fstat\n");
      exit(1);
   }

   // map
   // args: store it wherever, file size, read or write, visible for all process, file, file start index
   mapBeginPtr = mmap(NULL, fstat_buff.st_size, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
   if (mapBeginPtr == MAP_FAILED)
   {
      printf("Error: mmap\n");
      exit(1);
   }

   // cleanup
   if (Currentfd != -1)
   {
      close(Currentfd);
   }

   Currentfd = fd;
   // strcpy((char *)&currentFilenameOpen, (char *)filePath);
}

void printElfHeader(Elf32_Ehdr *hdr)
{
   // assumes given arg is tested to be valid ELF header

   char *dataDescription[9] = {
       "Magic:\t\t\t\t %X %X %X\n",
       "Data:\t\t\t\t %s\n",
       "Enty point address:\t\t 0x%x\n",
       "Start of section headers:\t %d (bytes into file)\n",
       "Number of section headers:\t %d\n",
       "Size of section headers:\t %d (bytes)\n",
       "Start of program headers:\t %d (bytes into file)\n",
       "Number of program headers:\t %d\n",
       "Size of program headers:\t %d (bytes)\n"};
   char *dtype =
       hdr->e_ident[5] == ELFDATA2LSB ? "Little endian" : hdr->e_ident[5] == ELFDATA2MSB ? "Big endian"
                                                                                         : "None";

   printf(dataDescription[0], hdr->e_ident[EI_MAG0], hdr->e_ident[EI_MAG1], hdr->e_ident[EI_MAG2]);
   printf(dataDescription[1], dtype);
   printf(dataDescription[2], hdr->e_entry);
   printf(dataDescription[3], hdr->e_shoff);
   printf(dataDescription[4], hdr->e_shnum);
   printf(dataDescription[5], hdr->e_shentsize);
   printf(dataDescription[6], hdr->e_phoff);
   printf(dataDescription[7], hdr->e_phnum);
   printf(dataDescription[8], hdr->e_phentsize);
}
