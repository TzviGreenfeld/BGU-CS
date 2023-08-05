## Task 2
> How much memory does the process use before and after the allocation?

16384, 81920

> What is the difference between the memory size before and afterthe release?

it's the same

> Try to explain the difference before and after release. What could cause this difference? (Hint: look at the implementation of malloc())

`malloc()` updats the process pcb in the 'sz' field, but `free()` doesn't.

```c
void*
malloc(uint nbytes)
{
  Header *p, *prevp;
  uint nunits;

  nunits = (nbytes + sizeof(Header) - 1)/sizeof(Header) + 1; // old size + the function parameter (amount to allocate)
  if((prevp = freep) == 0){
    base.s.ptr = freep = prevp = &base;
    base.s.size = 0;
  }
  for(p = prevp->s.ptr; ; prevp = p, p = p->s.ptr){
    if(p->s.size >= nunits){
      if(p->s.size == nunits)
        prevp->s.ptr = p->s.ptr;
      else {
        p->s.size -= nunits;
        p += p->s.size;
        p->s.size = nunits;
      }
      freep = prevp;
      return (void*)(p + 1);
    }
    if(p == freep)
      if((p = morecore(nunits)) == 0)
        return 0;
  }
}
```

```c
void
free(void *ap)
{
  Header *bp, *p;

  bp = (Header*)ap - 1;
  for(p = freep; !(bp > p && bp < p->s.ptr); p = p->s.ptr)
    if(p >= p->s.ptr && (bp > p || bp < p->s.ptr))
      break;
  if(bp + bp->s.size == p->s.ptr){
    bp->s.size += p->s.ptr->s.size;
    bp->s.ptr = p->s.ptr->s.ptr;
  } else
    bp->s.ptr = p->s.ptr;
  if(p + p->s.size == bp){
    p->s.size += bp->s.size;
    p->s.ptr = bp->s.ptr;
  } else
    p->s.ptr = bp;
  freep = p;
}
```
---
## Task 3
> What happened as soon as we changed the signatures for exit() and wait()? Why?

We got a lot of errors, because every usage of wait and exit only send 1 argument. (exitcode for `exit()` and the child state for `wait()`)

> What happens if the exit message is longer than 32 characters? How do we make sure nothing bad happens?

our msg is chopped to the first 32 chars. when running this code:
``` c
exit(0, "123456789111315171921232527293133");
```
the output is "1234567891113151719212325272931".

> What happens if the exit message is shorter than 32 characters? How do we make sure nothing bad happens?
Nothing bad happens, it null terminated so the output is what we printed

> How many times is our exit message copied?

3 times:
1. from user-space to kernel-space (in sys-exit)
2. in kernel space (kernel/proc.c: exit()) to the PCB:
```c
safestrcpy(p->exit_msg, exitMsg, sizeof(p->exit_msg));
```
3. from kernel space to user space (kernel/proc.c: wait()):
```c
copyout(p->pagetable, exitMsgAddr, (char *)pp->exit_msg, sizeof(pp->exit_msg));
```

> Where in sh.c does the shell receive the exit message? Explain briefly how this code works.
```c
  // Read and run input commands.
  while(getcmd(buf, sizeof(buf)) >= 0){
    if(buf[0] == 'c' && buf[1] == 'd' && buf[2] == ' '){
      // Chdir must be called by the parent, not the child.
      buf[strlen(buf)-1] = 0;  // chop \n
      if(chdir(buf+3) < 0)
        fprintf(2, "cannot cd %s\n", buf+3);
      continue;
    }
    if(fork1() == 0)
      runcmd(parsecmd(buf));
    char childExitMsg[32]; // TASK 3
    wait(0,childExitMsg);
    printf("%s\n", childExi
 ```
After we fork to execute a command, we wait for the child process to die and then we get the exit message.
```c
  case LIST:
    lcmd = (struct listcmd*)cmd;
    if(fork1() == 0)
      runcmd(lcmd->left);

    char childExitMsg[32]; // here
    wait(0,childExitMsg);
    printf("%s\n", childExitMsg);
 ```
 
> What happens if the shell modifies the exit message after it is received?
TODO: make sure
The shell is the one responsible to print the exit message, therefore the modified message will be printed.
---
## Task 4
> Find the scheduling policy in the xv6 code. Where is it implemented?

in kernel/proc.c we have:
``` c
void
scheduler(void)
{
  struct proc *p;
  struct cpu *c = mycpu();
  
  c->proc = 0;
  for(;;){
    // Avoid deadlock by ensuring that devices can interrupt.
    intr_on();

    for(p = proc; p < &proc[NPROC]; p++) {
      acquire(&p->lock);
      if(p->state == RUNNABLE) {
        // Switch to chosen process.  It is the process's job
        // to release its lock and then reacquire it
        // before jumping back to us.
        p->state = RUNNING;
        c->proc = p;
        swtch(&c->context, &p->context);

        // Process is done running for now.
        // It should have changed its p->state before coming back.
        c->proc = 0;
      }
      release(&p->lock);
    }
  }
}
```
> How does the policy choose which process to run?

loops over all the processes and finds one that is `RUNNABLE`, then changing it to `RUNNING` and when the process is done running the scheduler sets is back to `RUNNABLE`. we get a simple **<u>Round Robin</u>** policy

> What happens when a new process is created and when/how often does scheduling take place?

when a new process is created in `fork()`, a new 'struct proc' structure is allocated to represent the process, and a copy of the calling process's address space is created. The new process is initially in the `RUNNABLE` state, and it is added to the end of the 'ptable' process table.

the scheduler runs **indefinitely**, so in that sense it is always taking place
> What happens when a process calls a system call, for instance sleep()?
If it's called from the user space it been first trap at trap.c->usertrap and then it is calling the appropriate system call which is  define in the kernal space

1. The process invokes the `sleep()` system call by calling it from the user space which in turn calls the kernel-level `sys_sleep():
``` c
// kernel/sysproc.c
uint64
sys_sleep(void)
{
  int n;
  uint ticks0;

  argint(0, &n);
  acquire(&tickslock);
  ticks0 = ticks;
  while(ticks - ticks0 < n){
    if(killed(myproc())){
      release(&tickslock);
      return -1;
    }
    sleep(&ticks, &tickslock);
  }
  release(&tickslock);
  return 0;
}
```
2. The scheduler then selects the next process to run on the CPU.
3. When the timer interrupt occurs, the ```trap()``` function is called, which saves the current CPU state and switches to kernel mode.

``` c
// kernel/trap/c
// interrupts and exceptions from kernel code go here via kernelvec,
// on whatever the current kernel stack is.
void 
kerneltrap()
{
  int which_dev = 0;
  uint64 sepc = r_sepc();
  uint64 sstatus = r_sstatus();
  uint64 scause = r_scause();
  
  if((sstatus & SSTATUS_SPP) == 0)
    panic("kerneltrap: not from supervisor mode");
  if(intr_get() != 0)
    panic("kerneltrap: interrupts enabled");

  if((which_dev = devintr()) == 0){ 
    printf("scause %p\n", scause);
    printf("sepc=%p stval=%p\n", r_sepc(), r_stval());
    panic("kerneltrap");
  }

  // give up the CPU if this is a timer interrupt.
  if(which_dev == 2 && myproc() != 0 && myproc()->state == RUNNING)
    yield();

  // the yield() may have caused some traps to occur,
  // so restore trap registers for use by kernelvec.S's sepc instruction.
  w_sepc(sepc);
  w_sstatus(sstatus);
}
```
the timer interrupt is handled by the ```devintr()``` function, which checks if the interrupt is a timer interrupt and sets the state of the currently running process to RUNNABLE if it was sleeping due to a call to sleep(). This allows the process to be scheduled for execution again by the scheduler.

``` c
// kernel/trap.c
// check if it's an external interrupt or software interrupt,
// and handle it.
// returns 2 if timer interrupt,
// 1 if other device,
// 0 if not recognized.
int
devintr()
{
  uint64 scause = r_scause();

  if((scause & 0x8000000000000000L) &&
     (scause & 0xff) == 9){
    // this is a supervisor external interrupt, via PLIC.

    // irq indicates which device interrupted.
    int irq = plic_claim();

    if(irq == UART0_IRQ){
      uartintr();
    } else if(irq == VIRTIO0_IRQ){
      virtio_disk_intr();
    } else if(irq){
      printf("unexpected interrupt irq=%d\n", irq);
    }

    // the PLIC allows each device to raise at most one
    // interrupt at a time; tell the PLIC the device is
    // now allowed to interrupt again.
    if(irq)
      plic_complete(irq);

    return 1;
  } else if(scause == 0x8000000000000001L){
    // software interrupt from a machine-mode timer interrupt,
    // forwarded by timervec in kernelvec.S.

    if(cpuid() == 0){
      clockintr();
    }
    
    // acknowledge the software interrupt by clearing
    // the SSIP bit in sip.
    w_sip(r_sip() & ~2);

    return 2;
  } else {
    return 0;
  }
}

```

> When are we updating the runitme counters and why? (run time, sleep time, runnable time)

In kernel/trap.c: usertrap, kerneltrap we have 
```c
  if (which_dev == 2)
  {
    cfs_tick_update();
  }
```
`Which_dev == 2` means timer interrupt.
We updated it there since the scheduler is using timer interrupts to decide who runs next.TODO

## Task 6
> Is run time and sleep time of a process the same thing? If not, what is the difference between them?

No, run time is when process actually run, sleep time is when a process is sleeping which means the process is Blocked (could be waiting for something)

> Is the run time and runnable time of a process the same thing? If not, what is the difference between them?

No, runnable is when a process is ready to run but waiting for CPU time

> Run the test a few times. Did you notice any difference in the run times, sleep times, and runnable times of the three child processes? Explain your results.

?
> Do the three priority levels actually matter for which process gets more CPU time? Does it make sense to give a higher priority to a process that we want to run more often?

yes, because that's how the scheduler decides which process to run.

> Does this policy make sense for a real-life operating system? Explain your answer.
No, because its possible that processes with low priorty will starve.

