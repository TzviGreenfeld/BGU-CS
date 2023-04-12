#include "types.h"
#include "riscv.h"
#include "defs.h"
#include "param.h"
#include "memlayout.h"
#include "spinlock.h"
#include "proc.h"

uint64
sys_exit(void)
{
  int n;
  char exitMsg[32];
  argint(0, &n);
  argstr(1, exitMsg, 32); // TASK 3
  exit(n, exitMsg);
  return 0;  // not reached
}

uint64
sys_getpid(void)
{
  return myproc()->pid;
}

uint64
sys_memsize(void)
{
  return myproc()->sz;
}

uint64
sys_fork(void)
{
  return fork();
}

uint64
sys_wait(void)
{
  uint64 p;
  uint64 exitmsgPtr;
  argaddr(0, &p);
  argaddr(1, &exitmsgPtr);
  return wait(p, exitmsgPtr);
}

uint64
sys_sbrk(void)
{
  uint64 addr;
  int n;

  argint(0, &n);
  addr = myproc()->sz;
  if(growproc(n) < 0)
    return -1;
  return addr;
}

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

uint64
sys_kill(void)
{
  int pid;

  argint(0, &pid);
  return kill(pid);
}

// return how many clock tick interrupts have occurred
// since start.
uint64
sys_uptime(void)
{
  uint xticks;

  acquire(&tickslock);
  xticks = ticks;
  release(&tickslock);
  return xticks;
}

uint64
sys_set_ps_priority(void)
{
	int priority;

	argint(0, &priority);
  set_ps_priority(priority);
	return 0;
}

uint64
sys_set_cfs_priority(void)
{
	int priority;

	argint(0, &priority);
  set_cfs_priority(priority);
	return 0;
}

uint64
sys_get_cfs_stats(void)
{
	int pid;
	uint64 cfs_stats_addr;

	argint(0, &pid);

	argaddr(1, &cfs_stats_addr);
  get_cfs_stats(pid, (struct cfs_stats*)cfs_stats_addr);
  
	return 0;
}

uint64
sys_set_policy(void)
{
	int policy;

	argint(0, &policy);
	return set_policy(policy);
}