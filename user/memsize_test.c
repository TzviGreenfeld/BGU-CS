// Test that fork fails gracefully.
// Tiny executable so that the limit can be filling the proc table.

#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"

void memsizetest(void)
{
// (a) Print how many bytes of memory the running process is using by calling memsize().
    printf("%d\n", memsize());
// (b) Allocate 20k more bytes of memory by calling malloc().
    int* tmpPointer = malloc(20000);
// (c) Print how many bytes of memory the running process is using after the allocation.
    printf("%d\n", memsize());
// (d) Free the allocated array.
    free(tmpPointer);
// (e) Print how many bytes of m
    printf("%d\n", memsize());
}

int main(void)
{
    memsizetest();
    exit(0, "");
}
