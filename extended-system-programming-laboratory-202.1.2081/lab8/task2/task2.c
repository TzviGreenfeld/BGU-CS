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
void printSectionNames();
char *tsect(int t);
void printSingleSectionHeader(int index, char *sectName, Elf32_Shdr *section);
Elf32_Shdr *getTable(char *_name);
void printSymbol();

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

void printSectionNames()
{
   if (Currentfd != -1)
   {
      // calculate section tables start byte

      Elf32_Shdr *sectTables = mapBeginPtr + ELFheader->e_shoff;

      // calculate section tables names
      // start of file + section header offset + (table index * table size)
      Elf32_Shdr *sectTablesNames = mapBeginPtr + ELFheader->e_shoff + (ELFheader->e_shstrndx * ELFheader->e_shentsize);
      if (DEBUG)
      {
         printf("Section table is at: %p\nstring table entry is at: %p\n", sectTables, sectTablesNames);
         // [Nr] Name              Type            Addr     Off    Size   ES Flg Lk Inf Al
         // [index] section_name section_address section_offset section_size  section_type
         printf("[Nr] Name\t\tAddr\t\tOff\tSize\tType\t\toffset(bytes)\n");
      }
      else
      {
         printf("[Nr] Name\t\tAddr\t\tOff\tSize\tType\n");
      }

      int sectCount = ELFheader->e_shnum;
      for (int i = 0; i < sectCount; i++)
      {
         Elf32_Shdr *sectHdr = mapBeginPtr + ELFheader->e_shoff + (i * ELFheader->e_shentsize);
         char *name = mapBeginPtr + sectTablesNames->sh_offset + sectHdr->sh_name;
         printSingleSectionHeader(i, name, sectHdr);
      }
   }
   else
   {
      printf("open a file first\n");
   }
}

char *tsect(int t)
{
   // printf("HIHIH\n\nt is %d\n\n", t);
   char *typesByNum[12] = {
       "NULL",
       "PROGBITS",
       "SYMTAB",
       "STRTAB",
       "RELA",
       "HASH",
       "DYNAMIC",
       "NOTE",
       "NOBITS",
       "REL",
       "SHLIB",
       "DYNSYM",
   };
   if (0 <= t && t <= 11)
      return (typesByNum[t]);
   return "ERROR";
}

void printSingleSectionHeader(int index, char *sectName, Elf32_Shdr *sect)
{
   // [index] section_name section_address section_offset section_size  section_type
   printf("[%2d] ", index);
   printf("%-18.18s\t", sectName);
   printf("%#09x\t", sect->sh_addr);
   printf("%06d\t", sect->sh_offset);
   printf("%06d\t", sect->sh_size);
   printf("%-13.10s\t", tsect(sect->sh_type));
   if (DEBUG)
   {
      printf("offset = %d", ELFheader->e_shoff + (index * ELFheader->e_shentsize));
   }
   printf("\n");
}

void printSymbols()
{
   if (Currentfd != -1)
   {
      Elf32_Shdr *symbolTable = getTable(".symtab");
      // get the entry of "name" symbol name
      Elf32_Shdr *strtab = getTable(".strtab");
      //  section name
      Elf32_Shdr *shstrtab = getTable(".shstrtab");
      if (symbolTable != NULL)
      {
         int entryCount = (symbolTable->sh_size / sizeof(Elf32_Sym));

         printf("[Num]\tValue\t\tsection_index\tsection_name\t\tsymbol_name\n");
         for (int i = 0; i < entryCount; i++)
         {
            Elf32_Sym *entry = mapBeginPtr + symbolTable->sh_offset + (i * sizeof(Elf32_Sym));
            char *sectName;
            if (entry->st_shndx == 0xFFF1)
            {
               sectName = "ABS";
            }
            else if (entry->st_shndx == 0x0)
            {
               sectName = "UND";
            }
            else
            {
               Elf32_Shdr *sectPos = mapBeginPtr + ELFheader->e_shoff + (entry->st_shndx * ELFheader->e_shentsize);
               sectName = mapBeginPtr + shstrtab->sh_offset + sectPos->sh_name;
            }
            char *symbolName = mapBeginPtr + strtab->sh_offset + entry->st_name;
            char *symbolSize = mapBeginPtr + strtab->sh_offset + entry->st_size;

            printSymbol(i, entry->st_value, entry->st_shndx, sectName, symbolName, symbolSize);
         }
      }
      else
      {
         printf("Error: symbol not found\n");
      }
   }
   else
   {
      printf("Error: open a file first");
   }
}

Elf32_Shdr *getTable(char *_name)
{
   Elf32_Shdr *table = mapBeginPtr + ELFheader->e_shoff + (ELFheader->e_shstrndx * ELFheader->e_shentsize);
   for (size_t i = 0; i < ELFheader->e_shnum; i++)
   {
      Elf32_Shdr *entry = mapBeginPtr + ELFheader->e_shoff + (i * ELFheader->e_shentsize);
      char *name = mapBeginPtr + table->sh_offset + entry->sh_name;
      if (strcmp(_name, name) == 0)
      {
         return entry;
      }
   }
   return NULL;
}

void printSymbol(int index, int symbolVal, int sTableIndex, char *sectName, char *symbolName, char *symbolSize)
{
   printf("[%2d]\t", index);
   printf("%#09x\t", symbolVal);
   printf("%d\t\t", sTableIndex);
   printf("%-13.20s\t\t", sectName);
   printf("\%-20.30s\n", symbolName);
   if (DEBUG)
   {
      printf("Symbol size: %-20.30s\n", symbolSize);
   }
}