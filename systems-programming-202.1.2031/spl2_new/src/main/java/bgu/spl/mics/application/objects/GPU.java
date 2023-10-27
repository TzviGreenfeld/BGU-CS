package bgu.spl.mics.application.objects;

import bgu.spl.mics.application.services.GPUService;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;

/**
 * Passive object representing a single GPU.
 * Add all the fields described in the assignment as private fields.
 * Add fields and methods to this class as you see fit (including public methods and constructors).
 */
public class GPU {

  /**
   * Enum representing the type of the GPU.
   */
  public enum Type {
    RTX3090,
    RTX2080,
    GTX1080,
  }

  private Type type;
  private int time;
  private int trainRate;
  private int size;
  private int finishTime;
  private Queue<DataBatch> vram;
  private boolean currentlyTraining = false;
  private int activeTime = 0;
  private ArrayList<String> trainedModel;
  private Thread gpuServiceThread;

  public GPU(Type type) {
    this.type = type;
  }

  public void init(int cpuID) {
    time = 0;
    vram = new LinkedList<DataBatch>(); 
    trainRate = setTrainRate();
    GPUService gpuService = new GPUService("CPUservice " + cpuID, this);
    this.gpuServiceThread = new Thread(gpuService);
    gpuServiceThread.start();
  }

  public Thread getGpuServiceThread() {
    return gpuServiceThread;
  }

  public void tick() {
    time++;
  }

  private final int setTrainRate() {
    int rate = 0;
    switch (this.type) {
      case RTX3090:
        rate = 1;
        break;
      case RTX2080:
        rate = 2;
        break;
      case GTX1080:
        rate = 4;
        break;
    }
    return rate;
  }

  public Queue<DataBatch> splitToDataBatches(Data data) {
    // given data of length n*1000, returns a Queue of n atabatches
    Queue<DataBatch> splittedData = new LinkedList<>();
    int numberOfChunks = data.getSize() / 1000;
    for (int i = 0; i < numberOfChunks; i++) {
      splittedData.add(new DataBatch(data, i));
    }

    return splittedData;
  }

  public void trainModel(DataBatch dataBatch) {
    finishTime = time + trainRate;
    currentlyTraining = true;
  }

  public int getFinishTime() {
    return finishTime;
  }

  public int getSize() {
    return size;
  }

  public boolean isCurrentlyTraining() {
    return currentlyTraining;
  }

  public void setCurrentlyTraining(boolean newCurrentlyTraining) {
    this.currentlyTraining = newCurrentlyTraining;
  }

  public Queue<DataBatch> getVram() {
    return vram;
  }

  public void setVram(Queue<DataBatch> vram) {
    this.vram = vram;
  }

  public int getTime() {
    return time;
  }

  public int getActiveTime() {
    return activeTime;
  }

  public void updateGPUActiveTime() {
    activeTime++;
  }

  public ArrayList<String> getTrainedModels() {
    return trainedModel;
  }

  public void addTrainedModel(String modelName) {
    trainedModel.add(modelName);
  }
}
