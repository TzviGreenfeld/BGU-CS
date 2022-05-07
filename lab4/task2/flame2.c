#include "util.h"
#include <dirent.h>

#define O_RDONLY 00
#define STDIN 0
#define STDOUT 1
#define EXIT 1
#define STDERR 2
#define O_WRONLY 01
#define O_RDWR 02
#define O_CREAT 0x0200
#define SYS_READ 3
#define SYS_WRITE 4
#define OPEN 5
#define CLOSE 6
#define getdents 141
#define MAX_S 8192
#define ERR_CODE 0x55

extern int system_call();

int DEBUG = 0;
int PREFIX = 0;

struct linux_dirent
{
    unsigned long d_ino;
    unsigned long d_off;
    unsigned short d_reclen;
    char d_name[];
};

void printDirType(char type);
void debug(char *er);
void print(char *str);

int main(int argc, char *argv[], char *envp[])
{
    char *prefix;
    int prefLen;
    int i;
    for (i = 1; i < argc; i++)
    {
        if (strcmp(argv[i], "-D") == 0)
        {
            DEBUG = 1;
        }
        if ((argv[i][1] == 'p') || (argv[i][1] == 'a'))
        {

            prefLen = strlen(argv[i]) - 2;
            char prefix[prefLen];
            int j;
            for (j = 0; j < prefLen; j++)
            {
                prefix[j] = argv[i][j + 2];
            }
            prefix[j] = '\0';
            system_call(SYS_WRITE, STDOUT, prefix, strlen(prefix));

            if (argv[i][1] == 'p')
            {
                PREFIX = 1;
            }

            if (argv[i][1] == 'a')
            {
            }
        }
    }
    print("Flame 2 strikes!\n");
    int fd = system_call(OPEN, ".", O_RDONLY, 0777);
    debug("syscall: 05 returned: ");
    debug(itoa(fd));
    debug("\n");

    char buffer[MAX_S];
    int bytes_read;
    int currPos = 0;
    struct linux_dirent *dir;
    char dirType;

    while (1)
    {
        bytes_read = system_call(getdents, fd, buffer, MAX_S);

        if (bytes_read == 0)
        {
            break;
        }
        else if (bytes_read == -1)
        {
            int err = system_call(EXIT, ERR_CODE);
        }

        while (currPos < bytes_read)
        {
            dir = (struct linux_dirent *)(buffer + currPos);
            dirType = *(buffer + currPos + dir->d_reclen - 1);
            if (dir->d_ino != 0)
            {
                if (PREFIX)
                {
                    print("hi\n");
                    int c;
                    int equal = 1;
                    for (c = 0; c < prefLen && equal; c++){
                        equal = equal && (prefix + c) == (char*) dir->d_name;
                    }
                    if (equal)
                    {
                        print(dir->d_name);
                        print("\n");
                        printDirType(dirType);
                    }
                }
                else
                {
                    print(dir->d_name);
                    print("\n");
                }
            }

            currPos = currPos + dir->d_reclen;
        }
    }

    return 0;
}

void printDirType(char type)
{
    print("dir type: ");
    switch (type)
    {
    case 0:
        print("DT_UNKNOWN");
        break;

    case 1:
        print("DT_FIFO");
        break;

    case 2:
        print("DT_CHR");
        break;

    case 4:
        print("DT_DIR");
        break;

    case 6:
        print("DT_BLK");
        break;

    case 8:
        print("DT_REG");
        break;

    case 10:
        print("DT_LNK ");
        break;

    case 12:
        print("DT_SOCK ");
        break;

    case 14:
        print("DT_WHT");
        break;

    default:
        print("DT_UNKNOWN");
    }
    print("\n");
}

void debug(char *er)
{
    if (DEBUG)
    {
        system_call(SYS_WRITE, STDERR, er, strlen(er));
    }
}

void print(char *str)
{
    int write = system_call(SYS_WRITE, STDOUT, str, strlen(str));
    debug("syscall: 04 returned: ");
    debug(itoa(write));
    debug("\n");
}
