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
    public enum Type {RTX3090, RTX2080, GTX1080}

    private Type type;
    private int time;
    private int trainRate;
    private int size;
    private int finishTime;
    private Queue<DataBatch> vram;
    private boolean curentlyTraining = false;
    private int ActiveTime = 0;
    private ArrayList<String> trainedModel;
    private Thread gpuServiceThread;

    public GPU(Type type) {
        this.type = type;
    }

    public void init(int i){
        time = 0;
        vram = new LinkedList<DataBatch>(); //TODO:synchronized
        trainRate = setTrainRate();
        GPUService gpuService = new GPUService("CPUservice " + i,this);
        Thread t = new Thread(gpuService);
        gpuServiceThread = t;
        t.start();
    }

    public Thread getGpuServiceThread() {
        return gpuServiceThread;
    }

    public void tick() {
        time++;
        if (! vram.isEmpty()){

        }
    }

    final private int setTrainRate(){
        int rate = 0;
        switch (this.type){
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
        Queue<DataBatch> splittedData = new LinkedList<>();
        int numberOfChunks = data.getSize() / 1000;
        for (int i = 0; i < numberOfChunks; i++) {
            splittedData.add(new DataBatch(data, i));
        }


        return splittedData;
    }

    public void trainModel(DataBatch dataBatch){
         finishTime = time + trainRate;
         curentlyTraining = true;
    }

    public int getFinishTime() {
        return finishTime;
    }

    public int getSize() {
        return size;
    }

    public boolean isCurentlyTraining() {
        return curentlyTraining;
    }

    public void setCurentlyTraining(boolean curentlyTraining) {
        this.curentlyTraining = curentlyTraining;
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
        return ActiveTime;
    }

    public void updateGPUActiveTime(){
        ActiveTime++;
    };

    public ArrayList<String> getTrainedModels() {
        return trainedModel;
    }

    public void addTrainedModel(String modelName){
        trainedModel.add(modelName);
    }
}
