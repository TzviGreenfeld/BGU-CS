#include "kernel/types.h"
#include "ustack.h"
#include "kernel/riscv.h"
#include "user.h"



Header *head = 0; // inital

int new_page_malloc(void)
{
    char *newPageAddr;
    Header *newPageHeader;

    // allocate a new memory page using the sbrk system call
    newPageAddr = sbrk(PGSIZE);

    if (newPageAddr == (char *)-1)
    {
        // sbrk fail
        return -1;
    }

    /* cast the starting address of the new page to a Header pointer
        and init fields */
    newPageHeader = (Header *)newPageAddr;
    newPageHeader->prev = head;
    newPageHeader->len = sizeof(Header);

    // update global
    head = newPageHeader;

    return 1;
}

void *ustack_malloc(uint len)
{
    void *allocatedMemory;

    void *ERROR = (void *)-1;

    // is valid len
    if (!(0 < len && len <= 512))
    {
        printf("\n ustack_malloc ERROR:\t invalid len\n");
        return ERROR;
    }

    int hasEnoughSpace = (PGSIZE - head->len) < (len + sizeof(int));
    if (!head || !hasEnoughSpace)
    {
        /* used or ran out of sapce,
            need to allocate new page */
        int newPageSuccess = new_page_malloc();
        if (!newPageSuccess)
        {
            printf("\n ustack_malloc ERROR:\t cant allocate new page\n");
            return ERROR;
        }
    }

    /* calculate the starting address for newly allocated block
        and update offset */
    allocatedMemory = (void *)head + head->len;
    head->len += len;

    /* calculate the address where the length value should be stored
        and store it there */
    int *lengthPtr = (int *)((void *)head + head->len);
    *lengthPtr = len;

    // account for the additional memory used to store the len
    head->len += sizeof(int);

    return allocatedMemory;
}

int ustack_free(void)
{
    int freedLen;
    Header *prevPage;

    // is there any memory allocated on the stack
    if (!head)
    {
        return -1;
    }

    // get the address of the memory block being freed
    void* freedAddr = (void*)head + head->len - sizeof(int);
    freedLen = *((int*)freedAddr);

    /* update the allocated memory size, account for
        the freed length and the size of an integer */
    head->len -= (freedLen + sizeof(int));
    
    // is the entire page has been freed
    if (head->len == sizeof(Header))
    {
        prevPage = head->prev; 

        // deallocate the current page
        sbrk(-PGSIZE);

        head = prevPage;
    }

    return freedLen;
}
