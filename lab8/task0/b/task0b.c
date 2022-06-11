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
void clearBuffer();

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
   while (1)
   {
      presentOptions();
      int option = takeUserChoice(5);
      if (option != -1)
      {
         menu[option].fun();
      }
      printf("\n");
   }
}

int takeUserChoice(int bounds)
{
   int op;
   scanf("%d", &op);
   if (op >= 0 && op < bounds)
   {
      fprintf(stdout, "\n");
      return op;
   }
   else
   {
      fprintf(stdout, "Not within bounds\n");
      return -1;
   }
}
int isOutOfBounds(int option) { return (option < 0) || (5 <= option); }
void presentOptions()
{
   fprintf(stdout, "Please choose a function:\n");
   int i = 0;
   while (menu[i].name != NULL)
   {
      fprintf(stdout, "%d) %s\n", i, menu[i].name);
      i++;
   }
   fprintf(stdout, "Option: ");
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
   printf("%s\n", "Not Implemented yet");
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
       "1. Bytes 1,2,3 of the magic number (in ASCII):",
       "2. The data encoding scheme of the object file:",
       "3. Entry point (hexadecimal address):",
       "4. The file offset in which the section header table resides:",
       "5. The number of section header entries:",
       "6. The size of each section header entry:",
       "7. The file offset in which the program header table resides:",
       "8. The number of program header entries:",
       "9. The size of each program header entr:"};

   char *dtype =
       hdr->e_ident[5] == ELFDATA2LSB ? "Little endian" : hdr->e_ident[5] == ELFDATA2MSB ? "Big endian"
                                                                                         : "None";

   printf("%s %c %c %c\n", dataDescription[0], hdr->e_ident[0], hdr->e_ident[1], hdr->e_ident[2]);
   printf("%s %s\n", dataDescription[1], dtype);
   printf("%s 0x%x\n", dataDescription[2], hdr->e_entry);
   printf("%s %d\n", dataDescription[3], hdr->e_shoff);
   printf("%s %d\n", dataDescription[4], hdr->e_shnum);
   printf("%s %d\n", dataDescription[5], hdr->e_shentsize);
   printf("%s %d\n", dataDescription[6], hdr->e_phoff);
   printf("%s %d\n", dataDescription[7], hdr->e_phnum);
   printf("%s %d\n", dataDescription[8], hdr->e_phentsize);
}

void clearBuffer()
{
   char c;
   do
   {
      c = getchar();
   } while (c != '\n' && c != EOF);
}