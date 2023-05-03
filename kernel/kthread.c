#include "types.h"
#include "param.h"
#include "memlayout.h"
#include "riscv.h"
#include "spinlock.h"
#include "proc.h"
#include "defs.h"

extern struct proc proc[NPROC];

extern void forkret(void);

void kthreadinit(struct proc *p)
{

  initlock(&p->threadsId_lock, "proc");

  for (struct kthread *kt = p->kthread; kt < &p->kthread[NKT]; kt++)
  {
    initlock(&kt->lock, "kthread");
    acquire(&kt->lock);
    kt->state = TUNUSED;
    kt->process = p;
    release(&kt->lock);
    // WARNING: Don't change this line!
    // get the pointer to the kernel stack of the kthread
    kt->kstack = KSTACK((int)((p - proc) * NKT + (kt - p->kthread)));
  }
}


struct kthread *mykthread()
{
  push_off();
  struct cpu *c = mycpu();
  struct kthread *t = c->thread;
  pop_off();
  return t;
}


struct trapframe *get_kthread_trapframe(struct proc *p, struct kthread *kt)
{
  return p->base_trapframes + ((int)(kt - p->kthread));
}


int alloctid(struct proc* p)
{
  acquire(&p->threadsId_lock);
  int tid = p->threadsId;
  p->threadsId++;
  release(&p->threadsId_lock);
  return tid;
}

/**
 * allocates a thread
 * @post: returned thread's lock is acquired
*/
struct kthread* allocthread(struct proc* p)
{
  struct kthread *kt;
  for (kt = p->kthread; kt < &p->kthread[NKT]; kt++) {
    acquire(&kt->lock);
    if(kt->state == TUNUSED) {
      goto found;
    }
    else {
      release(&kt->lock);
    }
  }
  return 0;

found:
  kt->tid = alloctid(p);
  kt->state = TUSED;
  kt->trapframe = get_kthread_trapframe(p, kt);
  memset(&kt->context, 0, sizeof(kt->context));
  kt->context.ra = (uint64)forkret;
  kt->context.sp = kt->kstack + PGSIZE; 
  return kt;
}

/**
 * resets thread fields
 * @pre: kt lock must be held
 * @post: kt lock remains held
*/
void
freethread(struct kthread* kt)
{
  kt->tid = 0;
  kt->chan = 0;
  kt->killed = 0;
  kt->xstate = 0;
  kt->trapframe = 0;
  kt->state = TUNUSED;
}

int 
kthread_create(void *(*start_func)(), void *stack, uint stack_size){
  struct kthread *kt;
  if((kt = allocthread(myproc())) == 0){
    return -1;
  }
  
  kt->state = TRUNNABLE;
  // kt->kstack = (uint64) stack; 
  kt->trapframe->epc = (uint64) start_func;
  kt->trapframe->sp = (uint64) (stack + stack_size); 
  release(&kt->lock);
  return kt->tid;
}

//Find the kernel thread with the same tid.
struct kthread*
find_kthread_by_tid(int ktid){
  struct kthread *kt;
  struct proc *p = myproc();
  for(kt = p->kthread; kt < &p->kthread[NKT]; kt++) {
    acquire(&kt->lock);
    if(kt->tid == ktid){
      release(&kt->lock);
      return kt;
    }
    else{
      release(&kt->lock);
    }
  }
  return 0;
}

int
kthread_kill(int ktid){
  struct kthread *kt;
  if((kt = find_kthread_by_tid(ktid)) == 0){
    return -1;
  }
  acquire(&kt->lock);
  kt->killed = 1;
  if(kt->state == TSLEEPING) {
    kt->state = TRUNNABLE;
  }
  release(&kt->lock); 
  return 0;
}

int
last_process_kthread(struct kthread *kt){
  struct kthread* t;
  struct proc *p = myproc();
  for(t = p->kthread; t < &p->kthread[NKT]; t++){
    if(t != kt){
      acquire(&t->lock);
      if(t->state != TUNUSED && t->state != TZOMBIE){
        release(&t->lock);
        return 0;
      }
      release(&t->lock);
    }
  }
  return 1;
}

void
kthread_exit(int status){
  struct kthread *kt = mykthread();
  struct proc *p = myproc();

  if(last_process_kthread(kt)){
    exit(status);
  }
  
  acquire(&kt->lock);
  kt->xstate = status;
  kt->state = TZOMBIE;
  release(&kt->lock);
  
  acquire(&p->lock); 
  wakeup(kt);
  release(&p->lock);
  
  acquire(&kt->lock);
  sched();
  panic("zombie exit");
}

int 
kthread_join(int ktid, int *status){
  struct kthread *kt;
  struct proc *p = myproc();

  if((kt = find_kthread_by_tid(ktid)) == 0){
      return -1;
  }

  acquire(&p->lock);
  for(;;){
    if(kt->state == TZOMBIE){
      acquire(&kt->lock);
      if(status != 0 && copyout(kt->process->pagetable, (uint64) status, (char *)&kt->xstate,
                                          sizeof(kt->xstate)) < 0) {
        release(&kt->lock);
        release(&p->lock);
        return -1;
      }

      release(&kt->lock);
      freethread(kt);
      release(&p->lock);
      return 0;
    }

    sleep(kt, &p->lock);
  }
}

int
kthread_killed(struct kthread *kt)
{
  int k;
  acquire(&kt->lock);
  k = kt->killed;
  release(&kt->lock);
  return k;
}