typedef struct header
{
    int len;
    uint dealloc_page;
    struct header *prev;
} Header;

void *ustack_malloc(uint len);

int ustack_free(void);
int new_page_malloc(void);
