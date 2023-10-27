package bgu.spl.mics.application.services;

import bgu.spl.mics.MicroService;
import bgu.spl.mics.application.messages.CloseAllBroadcast;
import bgu.spl.mics.application.messages.TickBroadcast;
import bgu.spl.mics.application.objects.CPU;
import bgu.spl.mics.application.objects.Cluster;
import bgu.spl.mics.application.objects.DataBatch;

/**
 * CPU service is responsible for handling the {@link }.
 * This class may not hold references for objects which it is not responsible for.
 *
 * You can add private fields and public methods to this class.
 * You MAY change constructor signatures and even add new public constructors.
 */
public class CPUService extends MicroService {
    private CPU cpu;
    private final Cluster cluster;


    public CPUService(String name, CPU cpu) {
        super(name);
        this.cpu = cpu;
        cluster = Cluster.getInstance();
    }

    @Override
    protected void initialize() {
        subscribeBroadcast(TickBroadcast.class, c -> {
          cpu.tick();
            if (cpu.isBusy()) {
            	
            	cpu.updateCPUActiveTime();
                if (cpu.getFinishTime() == cpu.getTime()) {
                    cluster.returnProcessedData(cpu.getData(), cpu);
                    cpu.updateCPUActiveTime();
                    cpu.setBusy(false);
                }
            }
            if (! cpu.isBusy()){
                DataBatch dataBatch = cluster.getDataForProcess(cpu);
                if (dataBatch != null) {
                    cpu.process(dataBatch);
                    cpu.setBusy(true);
                }
            }
        });

        this.subscribeBroadcast(CloseAllBroadcast.class, c -> {
            this.terminate();
        });

    }
}
