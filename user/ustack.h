
typedef struct header
{
    uint len;
    uint dealloc_page;
    struct header *prev;
} Header;

void *ustack_malloc(uint len);

int ustack_free(void);