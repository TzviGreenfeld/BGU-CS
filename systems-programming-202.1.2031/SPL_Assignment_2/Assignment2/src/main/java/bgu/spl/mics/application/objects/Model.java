package bgu.spl.mics.application.objects;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;


/**
 * Passive object representing a Deep Learning model.
 * Add all the fields described in the assignment as private fields.
 * Add fields and methods to this class as you see fit (including public methods and constructors).
 */


public class Model{

    public enum Results {None, Good, Bad}

    public enum Status {PreTrained, Training, Trained, Tested}

    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("type")
    @Expose
    private Data.Type type;

    @SerializedName("size")
    @Expose
    private int size;
    private Student student;
    private Status status = Status.PreTrained;
    private Results results = Results.None;
    private Boolean published;
    private int trainedData = 0;
    private GPU trainerGPU;
    private Data data;


    public Model(String name, Data.Type type, int size) {
        this.name = name;
        this.type = type;
        this.size = size;
    }

    public void init(){
        this.status = Status.PreTrained;
        this.results = Results.None;
        this.published = false;

        data = new Data(type, size);
        data.setModel(this);
    }

    public void test(){
        System.out.println("hello");
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status newStatus) {
        this.status = newStatus;
    }

    public Results getResults() {
        return results;
    }

    public void setResults(Results newResults) {
        this.results = newResults;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public String getName() {
        return name;
    }

    public Data getData() {
        return data;
    }

    public GPU getTrainerGPU() {
        return trainerGPU;
    }

    public void setTrainerGPU(GPU trainerGPU) {
        this.trainerGPU = trainerGPU;
    }

    public int getSize() {
        return size;
    }

    public Data.Type getType() {
        return type;
    }

    public void setType(Data.Type type) {
        this.type = type;
    }
}


