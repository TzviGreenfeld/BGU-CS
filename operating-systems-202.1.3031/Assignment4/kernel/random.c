
#include "random.h"
#include <stdarg.h>
#include "param.h"
#include "spinlock.h"
#include "sleeplock.h"
#include "fs.h"
#include "file.h"
#include "memlayout.h"
#include "riscv.h"
#include "defs.h"
#include "proc.h"


struct
{
    struct spinlock lock;
    uint8 seed;
} theRandomDevice;

int _read(int user_dst, uint64 dst, int n)
{
    uint target;
    char cbuf;
    uint8 random_res;

    target = n;
    acquire(&theRandomDevice.lock);
    while (n > 0)
    {
        /* after every subsequent call to it,
        you should update the seed with the returned value */
        random_res = lfsr_char(theRandomDevice.seed);
        theRandomDevice.seed = random_res;

        // kernel/console.c: 111
        cbuf = random_res;
        if (either_copyout(user_dst, dst, &cbuf, 1) == -1)
            break;

        dst++;
        --n;
    }
    release(&theRandomDevice.lock);

    return target - n;
}

int _write(int user_src, uint64 src, int n)
{
    char c;

    if (n == 1 && either_copyin(&c, user_src, src, 1) != ERROR)
    {
        // simply get the char from user space 
        acquire(&theRandomDevice.lock);

        theRandomDevice.seed = c;

        release(&theRandomDevice.lock);

        return SUCCESS;
    }

    return ERROR;
}

void random_init(void)
{
    initlock(&theRandomDevice.lock, "theRandomDevice");

    theRandomDevice.seed = 0x2A;

    devsw[RANDOM].read = _read;
    devsw[RANDOM].write = _write;
}