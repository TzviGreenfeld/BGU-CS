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

  initlock(&p->counter_lock, "proc");

  for (struct kthread *kt = p->kthread; kt < &p->kthread[NKT]; kt++)
  {
    initlock(&kt->lock, "kthread");
    acquire(&kt->lock);
    kt->state = KT_UNUSED;
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
  struct kthread *kt = c->thread;
  pop_off();
  return kt;
}

struct trapframe *get_kthread_trapframe(struct proc *p, struct kthread *kt)
{
  return p->base_trapframes + ((int)(kt - p->kthread));
}

int alloctid(struct proc *p)
{
  int tid;

  acquire(&p->counter_lock);

  tid = p->counter;
  p->counter++;

  release(&p->counter_lock);
  return tid;
}

struct kthread *allocthread(struct proc *p)
{
  struct kthread *kt;
  for (kt = p->kthread; kt < &p->kthread[NKT]; kt++)
  {
    acquire(&kt->lock);
    if (kt->state == KT_UNUSED)
    {
      kt->tid = alloctid(p);
      kt->state = KT_USED;
      kt->trapframe = get_kthread_trapframe(p, kt);
      memset(&kt->context, 0, sizeof(kt->context));
      kt->context.ra = (uint64)forkret;
      kt->context.sp = kt->kstack + PGSIZE;
      return kt;
    }
    else
    {
      release(&kt->lock);
    }
  }
  return 0;
}

void freethread(struct kthread *kt)
{
  kt->tid = 0;
  kt->chan = 0;
  kt->killed = 0;
  kt->xstate = 0;
  kt->trapframe = 0;
  kt->state = KT_UNUSED;
}

int kthread_create(void *(*start_func)(), void *stack, uint stack_size)
{
  struct kthread *kt;
  if ((kt = allocthread(myproc())) != 0)
  {

    kt->state = KT_RUNNABLE;
    // kt->kstack = (uint64) stack;
    kt->trapframe->epc = (uint64)start_func;
    kt->trapframe->sp = (uint64)(stack + stack_size);
    release(&kt->lock);
    return kt->tid;
  }
  return -1;
}

int kthread_kill(int ktid)
{
  struct kthread *kt;
  struct proc *p = myproc();
  for (kt = p->kthread; kt < &p->kthread[NKT]; kt++)
  {
    acquire(&kt->lock);
    if (kt->tid == ktid)
    {
      kt->killed = 1;
      if (kt->state == KT_SLEEPING)
      {
        kt->state = KT_RUNNABLE;
      }
      release(&kt->lock);
      return 0;
    }
    else
    {
      release(&kt->lock);
    }
  }
  return -1;
}

void kthread_exit(int status)
{
  struct kthread *kt = mykthread();
  struct proc *p = myproc();

  // determine if this is the last active thread in the process
  int last_kthread = 1;
  for (struct kthread *t = p->kthread; t < &p->kthread[NKT]; t++)
  {
    if (t != kt)
    {
      acquire(&t->lock);
      if (t->state != KT_UNUSED && t->state != KT_ZOMBIE)
      {
        last_kthread = 0;
      }
      release(&t->lock);
    }
  }

  if (last_kthread)
  {
    // if this is the last active thread, call exit instead of becoming a zombie
    exit(status);
  }

  // set thread state to KT_ZOMBIE and wake up any waiting threads
  acquire(&kt->lock);
  kt->xstate = status;
  kt->state = KT_ZOMBIE;
  release(&kt->lock);

  acquire(&p->lock);
  wakeup(kt);
  release(&p->lock);

  // switch to a new thread or process, and panic if none are available
  acquire(&kt->lock);
  sched();
  panic("zombie exit");
}

int kthread_join(int ktid, int *status)
{
  struct kthread *kt;
  struct proc *p = myproc();

  int found = 0;
  for (kt = p->kthread; kt < &p->kthread[NKT] && !found; kt++)
  {
    acquire(&kt->lock);
    if (kt->tid == ktid)
    {
      release(&kt->lock);
      found = 1;
      break;
    }
    else
    {
      release(&kt->lock);
    }
  }
  if (!found)
  {
    return -1;
  }

  acquire(&p->lock);
  for (;;)
  {
    if (kt->state == KT_ZOMBIE)
    {
      acquire(&kt->lock);
      if (status != 0 && copyout(kt->process->pagetable, (uint64)status, (char *)&kt->xstate,
                                 sizeof(kt->xstate)) < 0)
      {
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
