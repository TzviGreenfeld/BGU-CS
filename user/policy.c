#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        exit(-1, "gimmie exactly one arrrrrrrg");
    }
    int policy_as_int = argv[1][0] - '0'; // hexing

    if (set_policy(policy_as_int) == 0)
    {
        printf("good job mate\n");
        return 0;
    }


    printf("oh no panic at the disco\n");
    return 1;
code }
