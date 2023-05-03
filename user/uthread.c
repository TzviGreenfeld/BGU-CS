#include "kernel/types.h"
#include "user/user.h"
#include "uthread.h"

static struct uthread threads[MAX_UTHREADS];

static struct uthread *my_user_thread = 0;

//Returns the index in the array where the current running thread is located.
int get_my_user_thread_index(){
    struct uthread *t;
    int curr_thread_index = -1;
    for(t = threads; t < &threads[MAX_UTHREADS]; t++) {
        curr_thread_index += 1;
        if(t == my_user_thread){
            break;
        }      
    }
    return curr_thread_index; 
}

//returns the next runnable thread to run based on the priority scheduling policy, or 0 if there are no runnable threads.
struct uthread* get_next_runnable_thread() {
    struct uthread *th;
    struct uthread *maxPrThread = 0;
    enum sched_priority max_priority = LOW;
    int first = 1;

    if(my_user_thread == 0){    //Main thread running
        for(th = threads; th < &threads[MAX_UTHREADS]; th++){
            if(th->state == RUNNABLE && first){   //First thread
                maxPrThread = th;
                max_priority = th->priority;
                first = 0;
            } else if(th->state == RUNNABLE && th->priority > max_priority) {  //Swap
                maxPrThread = th;
                max_priority = th->priority;
            }
        }
        return maxPrThread;

    } else {
        int curr_thread_index = get_my_user_thread_index();
        //Looks for the next thread in a round-robin manner, starting from the index of the running thread.
        for(int i = 1; i <= MAX_UTHREADS; i++) {

            th = &threads[(curr_thread_index+i) % MAX_UTHREADS];

            if(th == my_user_thread){    //We completed a full round-robin traversal of the array.
                break;
            } else if(th->state == RUNNABLE && first){   //First thread
                maxPrThread = th;
                max_priority = th->priority;
                first = 0;
            } else if(th->state == RUNNABLE && th->priority > max_priority) {  //Swap
                maxPrThread = th;
                max_priority = th->priority;
            }
        }

        return maxPrThread;
    }
}


void uthread_yield() {
    struct uthread *next = get_next_runnable_thread();
    //Determines whether there is another thread that can be executed, using the priority scheduling policy.
    if(next != 0 && next->priority >= my_user_thread-> priority){
        struct uthread *prev = my_user_thread;
        prev->state = RUNNABLE;
        next->state = RUNNING;
        my_user_thread = next;
        uswtch(&prev->context,&next->context);
    }
}


void uthread_exit() {
    struct uthread *next = get_next_runnable_thread();
    //Determines whether there is another thread that can be executed.
    if(next != 0){
        struct uthread *prev = my_user_thread;
        prev->state = FREE;
        my_user_thread = next;
        next->state = RUNNING;
        uswtch(&prev->context,&next->context);
    } else {
        my_user_thread->state = FREE;
        exit(0);
    } 
}

//Create and initialize new threads within our threads array.
int uthread_create(void (*start_func)(), enum sched_priority priority) {
    struct uthread *t;
    for(t = threads; t < &threads[MAX_UTHREADS]; t++) {       // Search for unused thread.
        if(t->state == FREE) {
            t->context.ra = (uint64) start_func;
            t->context.sp = (uint64) &t->ustack[STACK_SIZE-1];
            t->priority = priority;
            t->state = RUNNABLE;
            return 0;
        }
    }
    return -1;      // not found
}


enum sched_priority uthread_set_priority(enum sched_priority priority) {
    enum sched_priority prevPriority = my_uthread()->priority;
    my_uthread()->priority = priority;
    return prevPriority;
}


enum sched_priority get_u_priority() {
    return my_uthread()->priority;
}


int uthread_start_all() {
    static int first = 1;

    if(first) {
        struct context context;

        my_user_thread = get_next_runnable_thread();
        my_user_thread->state = RUNNING; 
        first = 0;
        
        uswtch(&context, &my_user_thread->context);
    }
    return -1;
}


struct uthread* my_uthread() {
    return my_user_thread;
}

