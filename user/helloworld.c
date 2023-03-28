#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"

int main(int argc, char *argv[])
{
    char *helloWorld = "Hello World xv6";
    write(1, helloWorld, strlen(helloWorld));
    write(1, "\n", 1);
    exit(0);
}
