package bgu.spl.mics.application.objects;


import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.PriorityQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

/**
 * Passive object representing the cluster.
 * <p>
 * This class must be implemented safely as a thread-safe singleton.
 * Add all the fields described in the assignment as private fields.
 * Add fields and methods to this class as you see fit (including public methods and constructors).
 */
public class Cluster {
	@SerializedName("CPUS")
	@Expose
	private ArrayList<CPU> CPUs;
	private PriorityQueue<CPU> availableCPUs;
	@SerializedName("GPUS")
	@Expose
	private ArrayList<GPU> GPUs;
	private ClusterStatistics statistics;
	private BlockingQueue<DataBatch> awaitingProcess;
	private int speed;

	private Cluster(){
		GPUs = new ArrayList<GPU>();
		CPUs = new ArrayList<CPU>();
		availableCPUs = new PriorityQueue<CPU>(new CPUComperator());
		for(CPU cpu : CPUs){
			availableCPUs.add(cpu);
		}
		awaitingProcess = new LinkedBlockingQueue<DataBatch>();

	}

	/**
     * Retrieves the single instance of this class.
     */

	private static class SingeltonHolder{
		private static Cluster instance = new Cluster();
	}

	public static Cluster getInstance() {
		return Cluster.SingeltonHolder.instance;
	}


    public void processData(DataBatch dataBatch) {
		synchronized (awaitingProcess) {
			awaitingProcess.add(dataBatch);
		}
    }


	public DataBatch getDataForProcess(CPU cpu) {
		DataBatch needsProcessing;
		try {
			needsProcessing = awaitingProcess.poll(speed, TimeUnit.MILLISECONDS);
			if (needsProcessing != null) {
				synchronized (availableCPUs){
					availableCPUs.remove(cpu);
				}
				availableCPUs.notifyAll();
			}
		} catch (InterruptedException e) {
			needsProcessing = null;
		}
		return needsProcessing;
	}

	public void setSpeed(int speed) {
		this.speed = speed;
		// TODO: set on initilaizationi
	}

	public void returnProcessedData(DataBatch dataBatch, CPU sender) {
		GPU trainer = dataBatch.getData().getModel().getTrainerGPU();
		synchronized (trainer.getVram()) {
			trainer.getVram().add(dataBatch);
		}
		synchronized (availableCPUs) {
			availableCPUs.add(sender);
		}
	}
	
	public ClusterStatistics getClusterStatistics() {
		statistics = new ClusterStatistics();
		return this.statistics;
	}

	public void setCPUs(ArrayList<CPU> CPUs) {
		this.CPUs = CPUs;
	}

	public void setGPUs(ArrayList<GPU> GPUs) {
		this.GPUs = GPUs;
	}

	/// get full statistics String by calling .toString
	public class ClusterStatistics{

		private ArrayList<String> trainedModels;
		private Integer numberOfProcessedBatches;
		private Integer CPUActiveTime;
		private Integer GPUActiveTime;

		public ClusterStatistics() {
			this.trainedModels = new ArrayList<String>();
			this.numberOfProcessedBatches = 0;
			this.CPUActiveTime = 0;
			this.GPUActiveTime = 0;

			for(CPU cpu : Cluster.getInstance().CPUs){
				CPUActiveTime += cpu.getActiveTime();
				numberOfProcessedBatches += cpu.getNumberOfBatchesProcessed();
			}

			for(GPU gpu : Cluster.getInstance().GPUs){
				GPUActiveTime += gpu.getActiveTime();
				trainedModels.addAll(gpu.getTrainedModels());
			}

		}

		@Override
		public String toString() {
			return "ClusterStatistics:\n" +
					"Trained models names:\t" + trainedModels.toString() + "\n" +
					"Total number of Processed DataBatches:\t" + numberOfProcessedBatches + "\n" +
					"CPU active time (ticks):\t" + CPUActiveTime + "\n" +
					"GPU active time (ticks):\t" + GPUActiveTime + "\n";
		}
	}
}
