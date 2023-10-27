

#include "types.h"

uint8 lfsr_char(uint8 lfsr)
{
    uint8 bit;
    bit = ((lfsr >> 0) ^ (lfsr >> 2) ^ (lfsr >> 3) ^ (lfsr >> 4)) & 0x01;
    lfsr = (lfsr >> 1) | (bit << 7);
    return lfsr;
}

int _read(int user_dst, uint64 dst, int n);
int _write(int user_src, uint64 src, int n);
void random_init(void);
