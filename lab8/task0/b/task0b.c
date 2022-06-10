#include <stdio.h>

// constants
#define FALSE 0
#define TRUE 1
#define MAX_BUFF 2048

// globals
int DEBUG = FALSE;
int Currentfd = 0;
fun_desc menu[] = {
    {"Toggle Debug Mode", toggleDebugMode},
    {"Examine ELF File", examineELFFile},
    {"Print Section Names", printSectionNames},
    {"Print Symbols", printSymbols},
    {"Quit", quit},
    {NULL, NULL}};

// functions
void presentOptions();
void toggleDebugMode();
void examineELFFile();
void printSectionNames();
void printSymbols();
void quit();
int isOutOfBounds(int option);

// structs
typedef struct
{
   char *name;
   void (*fun)();
} fun_desc;

int main()
{
   /*
      0-Toggle Debug Mode
      1-Examine ELF File
      2-Print Section Names
      3-Print Symbols
      5-Quit
   */
   presentOptions();
   return 0;
}

int isOutOfBounds(int option) { return (option < 0) || (menu.length() < option); }
void presentOptions()
{
   // show menu options
   for (int i = 0; menu[i].name != NULL; i++)
   {
      printf("%d-%s\n", i, menu[i].name);
   }

   // take input and validate
   printf("Choose from options:\n");
   int option;
   scanf("%d", &option);
   if (isOutOfBounds(option))
   {
      printf("out of bounds\n");
      exit(1);
   }
   printf("Option: %d\n", option);

   // execute requested function
   menu[option].fun();
}

void toggleDebugMode()
{
   DEBUG = !DEBUG;
   DEBUG ? printf("Debug ON\n") : printf("Debug OFF\n");
}

void examineELFFile()
{
   int b1, b2, b3, entryPoint;

   printf("Bytes 1,2,3 of the magic number (in ASCII): %d, %d, %d\n", b1, b2, b3);
   printf("Entry point (in hexadecimal): %d", entryPoint);
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