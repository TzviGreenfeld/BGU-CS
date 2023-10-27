package bgu.spl.mics.application.objects;

/**
 * Passive object representing a data used by a model.
 * Add fields and methods to this class as you see fit (including public methods and constructors).
 */

public class DataBatch {

    private Data data;
    private int start_index;
    private GPU currentGPU;
    boolean usedForTraining = false;
    boolean proccessed = false;

    public DataBatch(Data data, int start_index) {
        this.data = data;
        this.start_index = start_index;
    }

    public Data getData() {
        return data;
    }

    public int getStart_index() {
        return start_index;
    }

    public GPU getCurrentGPU() {
        return currentGPU;
    }

    public boolean isUsedForTraining() {
        return usedForTraining;
    }

    public void setUsedForTraining_(boolean usedForTraining) {
        this.usedForTraining = usedForTraining;
    }
    public void proccessed(){
        proccessed=true;
    }
}


