#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"
#include "kernel/cfs_utils.h"

#define _MIL 100000000
#define _100K 10000000
// #define _MIL 1000000000
// #define _100K 10000000

void test_cfs(int priority)
{

    set_cfs_priority(priority);
    for (long long j = 0; j < _MIL; j++)
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
}

void test_ps(int priority)
{

    set_ps_priority(priority);
    for (long long j = 0; j < _MIL; j++)
    {
        if (j % _100K == 0)
        {
            sleep(10);
        }
    }
    struct cfs_stats curr_stats;
    get_cfs_stats(getpid(), &curr_stats);

    sleep(10);
    printf("PID: %d, priority: %d, run time: %d, sleep time: %d, runnable time: %d\n", getpid(), priority, curr_stats.rtime, curr_stats.stime, curr_stats.retime);
}

int main(int argc, char *argv[])
{
    int cfs = 1;

    int pid;
    pid = fork();
    if (pid == 0) // child
    {
        sleep(1);
        pid = fork();

        if (pid == 0)
        {
            sleep(1);
            cfs == 1 ? test_cfs(2) : test_ps(10);
        }
        else
        {
            cfs == 1 ? test_cfs(1) : test_ps(5);
        }
    }
    else
    {
        cfs == 1 ? test_cfs(0) : test_ps(1);
    }
    wait(0, "");
    return 0;
}
