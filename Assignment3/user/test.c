#include "kernel/types.h"
#include "kernel/stat.h"
#include "kernel/param.h"
#include "user.h"
#include "ustack.h"

void malloc_full_page()
{
   void *buffer1 = ustack_malloc(512);
   // void* buffer2 =
   ustack_malloc(512);
   // void* buffer3 =
   ustack_malloc(512);
   // void* buffer4 =
   ustack_malloc(512);
   // void* buffer5 =
   ustack_malloc(512);
   // void* buffer6 =
   ustack_malloc(512);
   // void* buffer7 =
   ustack_malloc(512);
   void *buffer8 = ustack_malloc(512);

   printf("Allocated page: %d to %d \n", buffer1, buffer8 + 512);
   
}
int main(void)
{
   printf("----------TEST START----------\n");
   for (int i = 0; i <= 20; i++)
   {
      printf("--------------ALLOC PAGE[%d]\n", i);
      malloc_full_page();
   }
   for (int i = 0; i <= 200; i++)
   {
      ustack_free();
   }
   printf("TEST OK EXIT>>>\n");
   exit(0);
}