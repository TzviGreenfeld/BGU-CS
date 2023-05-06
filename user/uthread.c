#include "kernel/types.h"
#include "user/user.h"
#include "uthread.h"

static struct uthread threads[MAX_UTHREADS];

static struct uthread *currThread = 0;
struct uthread *uthread_self()
{ // TASK 1
    return currThread;
}

// return the next runnable
struct uthread *next_thread()
{
    int i;
    int first = 1;
    struct uthread *ut;
    enum sched_priority next_thread_priotiy = LOW;
    struct uthread *next_thread = 0;

    if (currThread == 0)
    {
        for (ut = threads; ut < &threads[MAX_UTHREADS]; ut++)
        {
            if (ut->state == RUNNABLE && first)
            {

                next_thread = ut;
                next_thread_priotiy = ut->priority;
                first = 0;
            }
            else if (ut->state == RUNNABLE && ut->priority > next_thread_priotiy)
            {
                next_thread = ut;
                next_thread_priotiy = ut->priority;
            }
        }
        return next_thread;
    }
    else
    {
        int idx = -1;
        for (ut = threads; ut < &threads[MAX_UTHREADS]; ut++)
        {
            idx += 1;
            if (ut == currThread)
            {
                break;
            }
        }

        for (i = 1; i <= MAX_UTHREADS; i++)
        {

            ut = &threads[(idx + i) % MAX_UTHREADS];

            if (ut == currThread)
            {
                break;
            }
            else if (ut->state == RUNNABLE && first)
            {
                next_thread = ut;
                next_thread_priotiy = ut->priority;
                first = 0;
            }
            else if (ut->state == RUNNABLE && ut->priority > next_thread_priotiy)
            {
                next_thread = ut;
                next_thread_priotiy = ut->priority;
            }
        }

        return next_thread;
    }
}

void uthread_yield()
{ // TASK 1
    struct uthread *next = next_thread();
    if (next != 0 && next->priority >= currThread->priority)
    {
        struct uthread *prev = currThread;
        prev->state = RUNNABLE;
        next->state = RUNNING;
        currThread = next;
        uswtch(&prev->context, &next->context);
    }
}

int uthread_create(void (*start_func)(), enum sched_priority priority)
{ // TASK 1
    struct uthread *ut;
    for (ut = threads; ut < &threads[MAX_UTHREADS]; ut++)
    {
        if (ut->state == FREE)
        {
            ut->context.ra = (uint64)start_func;
            ut->context.sp = (uint64)&ut->ustack[STACK_SIZE - 1];
            ut->priority = priority;
            ut->state = RUNNABLE;
            return 0;
        }
    }
    return -1;
}

void uthread_exit()
{ // TASK 1
    struct uthread *prev = currThread;
    struct uthread *next = next_thread();

    if (next == 0)
    {
        currThread->state = FREE;
        exit(0);
    }

    prev->state = FREE;
    currThread = next;
    next->state = RUNNING;
    uswtch(&prev->context, &next->context);
}

int uthread_start_all()
{ // TASK 1
    static int first = 1;

    if (!first)
    {
        return -1;
    }
    struct context context;

    currThread = next_thread();
    currThread->state = RUNNING;
    first = 0;

    uswtch(&context, &currThread->context);
    return 0;
}
