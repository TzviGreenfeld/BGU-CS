#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"
#include "kernel/cfs_utils.h"

#define _MIL 1000000
#define _100K 100000

void test()
{
    for (int i = 0; i < 3; i++)
    {
        if (fork() == 0)
        { // child
            set_cfs_priority(i);
            for (int j = 0; j < _MIL; j++)
            {
                if (j % _100K == 0)
                {
                    sleep(10);
                }
            }
            struct cfs_stats curr_stats;
            get_cfs_stats(getpid(), &curr_stats);

            sleep(10);
            printf("PID: %d, CFS priority: %d, run time: %d, sleep time: %d, runnable time: %d\n", getpid(), curr_stats.cfs_priority, curr_stats.rtime, curr_stats.stime, curr_stats.retime);

            exit(0, "");
        }
        // else
        // { // parent
        //     sleep(100);
        // }
    }
    wait(0, 0);
    wait(0, 0);
    wait(0, 0);
    exit(0, "");
}

int main(int argc, char *argv[])
{
    
    test();
    return 0;
}