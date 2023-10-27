package bgu.spl.mics.application.objects;

import bgu.spl.mics.application.services.*;
import java.util.Comparator;

/**
 * Passive object representing a single CPU.
 * Add all the fields described in the assignment as private fields.
 * Add fields and methods to this class as you see fit (including public methods and constructors).
 */
public class CPU {

  private int cores;
  private int time;
  private DataBatch data;
  private Cluster cluster;
  private boolean busy;
  private int finishTime;
  private int ActiveTime = 0;
  private int numberOfBatchesProcessed = 0;
  private Thread CPUServiceThread;

  public CPU(int cores) {
    this.cores = cores;
  }

  public void init(int cpuID) {
    busy = false;
    CPUService cpuService = new CPUService("CPUService " + cpuID, this);
    this.CPUServiceThread = new Thread(cpuService);

    CPUServiceThread.start();
  }

  public Thread getCPUServiceThread() {
    return CPUServiceThread;
  }

  private int processRate(Data.Type dataType) {
    int rate = 0;
    switch (dataType) {
      case Images:
        rate = (32 / cores) * 4;
        break;
      case Text:
        rate = (32 / cores) * 2;
        break;
      case Tabular:
        rate = (32 / cores);
        break;
    }

    return rate;
  }

  public void process(DataBatch dataBatch) {
    finishTime = time + processRate(dataBatch.getData().getType());
  }

  public void tick() {
    time++;
  }

  public int getCores() {
    return cores;
  }

  public boolean isBusy() {
    return busy;
  }

  public void setBusy(boolean busy) {
    this.busy = busy;
  }

  public int getFinishTime() {
    return finishTime;
  }

  public int getTime() {
    return time;
  }

  public DataBatch getData() {
    return data;
  }

  public int getActiveTime() {
    return ActiveTime;
  }

  public void updateCPUActiveTime() {
    this.ActiveTime++;
  }

  public int getNumberOfBatchesProcessed() {
    return numberOfBatchesProcessed;
  }

  public void updateNumberOfBatchesProcessed(int numberOfBatchesProcessed) {
    this.numberOfBatchesProcessed = numberOfBatchesProcessed;
  }
}

class CPUComperator implements Comparator<CPU> {
    // comparsion by number of cores
  @Override
  public int compare(CPU o1, CPU o2) {
    
    if (o1.getCores() < o2.getCores()) {
      return 1;
    } else if (o1.getCores() > o2.getCores()) {
      return -1;
    } else {
      return 0;
    }
  }
}
