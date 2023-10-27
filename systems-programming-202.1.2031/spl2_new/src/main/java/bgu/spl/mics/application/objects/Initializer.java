package bgu.spl.mics.application.objects;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Initializer implements Serializable {
    // .json parser
    @SerializedName("Students")
    @Expose
    public List<Student> students = null;
    @SerializedName("GPUS")
    @Expose
    public List<GPU.Type> gpusTypes = null;
    @SerializedName("CPUS")
    @Expose
    public List<Integer> cpusCores = null;
    @SerializedName("Conferences")
    @Expose
    public List<ConfrenceInformation> conferences = null;
    @SerializedName("TickTime")
    @Expose
    public Integer tickTime;
    @SerializedName("Duration")
    @Expose
    public Integer duration;

    public ArrayList<GPU> actualGPUS;
    public ArrayList<CPU> actualCPUS;


    public void init() {
        // init CPUS
        actualCPUS = new ArrayList<CPU>();
        int cpu_i = 0;
        for (Integer cores : cpusCores) {
            CPU currCPU = new CPU(cores);
            actualCPUS.add(currCPU);
//            currCPU.init(cpu_i);
            cpu_i++;
        }

        // init GPUS
        actualGPUS = new ArrayList<GPU>();
        int gpu_i = 0;
        for (GPU.Type type : gpusTypes) {
            GPU currGPU = new GPU(type);
            actualGPUS.add(currGPU);
//            currGPU.init(gpu_i);
            gpu_i++;
        }



        //test
        for (CPU cpu: actualCPUS){
            cpu.init(0);
        }
        // test
        for (GPU gpu: actualGPUS){
            gpu.init(0);
        }

        int student_i = 0;
        for (Student student : students) {
            student.init(student_i);
            for (Model model : student.getModels()) {
                model.setStudent(student);
                model.init();
            }
            student_i++;
        }

        for (ConfrenceInformation confrenceInformation : conferences) {
            confrenceInformation.init(confrenceInformation.getName());

        }

        /// set the cluster
        Cluster.getInstance().setCPUs(actualCPUS);
        Cluster.getInstance().setGPUs(actualGPUS);

    }

    public Initializer(List<Student> students, List<GPU.Type> gpus, List<Integer> cpus, List<ConfrenceInformation> conferences, Integer tickTime, Integer duration) {
        super();
        this.students = students;
        this.gpusTypes = gpus;
        this.cpusCores = cpus;
        this.conferences = conferences;
        this.tickTime = tickTime;
        this.duration = duration;

    }

    public Integer getTickTime() {
        return tickTime;
    }

    public Integer getDuration() {
        return duration;
    }

    public List<GPU> getGPUS() {
        return actualGPUS;
    }

    public List<CPU> getCPUS() {
        return actualCPUS;
    }

    /**
     * TESTING
     **/
    public List<Student> getStudents() {
        return students;
    }

    public List<GPU.Type> getGpus() {
        return gpusTypes;
    }

    public List<Integer> getCpus() {
        return cpusCores;
    }

    public List<ConfrenceInformation> getConferences() {
        return conferences;
    }

    public List<GPU> getActualGPUS() {
        return actualGPUS;
    }

    public List<CPU> getActualCPUS() {
        return actualCPUS;
    }
}
