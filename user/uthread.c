#include "kernel/types.h"
#include "user/user.h"
#include "uthread.h"

static struct uthread threads[MAX_UTHREADS];

static struct uthread *my_user_thread = 0;

int get_my_user_thread_index()
{
    struct uthread *ut;
    int curr = -1;
    for (ut = threads; ut < &threads[MAX_UTHREADS]; ut++)
    {
        curr += 1;
        if (ut == my_user_thread)
        {
            break;
        }
    }
    return curr;
}

struct uthread *get_next_runnable_thread()
{
    struct uthread *ut;
    struct uthread *top_priority_thread = 0;
    enum sched_priority max_priority = LOW;
    int first = 1;

    if (my_user_thread == 0)
    { 
        for (ut = threads; ut < &threads[MAX_UTHREADS]; ut++)
        {
            if (ut->state == RUNNABLE && first)
            { 
                
                top_priority_thread = ut;
                max_priority = ut->priority;
                first = 0;
            }
            else if (ut->state == RUNNABLE && ut->priority > max_priority)
            { 
                top_priority_thread = ut;
                max_priority = ut->priority;
            }
        }
        return top_priority_thread;
    }
    else
    {
        int curr_thread_index = get_my_user_thread_index();
        
        for (int i = 1; i <= MAX_UTHREADS; i++)
        {

            ut = &threads[(curr_thread_index + i) % MAX_UTHREADS];

            if (ut == my_user_thread)
            { 
                break;
            }
            else if (ut->state == RUNNABLE && first)
            { 
                top_priority_thread = ut;
                max_priority = ut->priority;
                first = 0;
            }
            else if (ut->state == RUNNABLE && ut->priority > max_priority)
            { 
                top_priority_thread = ut;
                max_priority = ut->priority;
            }
        }

        return top_priority_thread;
    }
}

enum sched_priority uthread_set_priority(enum sched_priority priority)
{
    enum sched_priority prev = uthread_self()->priority;
    uthread_self()->priority = priority;
    return prev;
}

enum sched_priority get_uthread_self_priority()
{
    return uthread_self()->priority;
}

void uthread_yield()
{ // TASK 1
    struct uthread *next = get_next_runnable_thread();
    // Determines whether there is another thread that can be executed, using the priority scheduling policy.
    if (next != 0 && next->priority >= my_user_thread->priority)
    {
        struct uthread *prev = my_user_thread;
        prev->state = RUNNABLE;
        next->state = RUNNING;
        my_user_thread = next;
        uswtch(&prev->context, &next->context);
    }
}

void uthread_exit()
{ // TASK 1
    struct uthread *next = get_next_runnable_thread();
    // Determines whether there is another thread that can be executed.
    if (next != 0)
    {
        struct uthread *prev = my_user_thread;
        prev->state = FREE;
        my_user_thread = next;
        next->state = RUNNING;
        uswtch(&prev->context, &next->context);
    }
    else
    {
        my_user_thread->state = FREE;
        exit(0);
    }
}

// Create and initialize new threads within our threads array.
int uthread_create(void (*start_func)(), enum sched_priority priority)
{ // TASK 1
    struct uthread *t;
    for (t = threads; t < &threads[MAX_UTHREADS]; t++)
    { // Search for unused thread.
        if (t->state == FREE)
        {
            t->context.ra = (uint64)start_func;
            t->context.sp = (uint64)&t->ustack[STACK_SIZE - 1];
            t->priority = priority;
            t->state = RUNNABLE;
            return 0;
        }
    }
    return -1; // not found
}

int uthread_start_all()
{ // TASK 1
    static int first = 1;

    if (first)
    {
        struct context context;

        my_user_thread = get_next_runnable_thread();
        my_user_thread->state = RUNNING;
        first = 0;

        uswtch(&context, &my_user_thread->context);
    }
    return -1;
}

struct uthread *uthread_self()
{ // TASK 1
    return my_user_thread;
}
