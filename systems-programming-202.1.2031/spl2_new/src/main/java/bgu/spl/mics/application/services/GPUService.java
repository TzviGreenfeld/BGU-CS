package bgu.spl.mics.application.services;

import bgu.spl.mics.Event;
import bgu.spl.mics.Message;
import bgu.spl.mics.MicroService;
import bgu.spl.mics.application.messages.CloseAllBroadcast;
import bgu.spl.mics.application.messages.TestModelEvent;
import bgu.spl.mics.application.messages.TickBroadcast;
import bgu.spl.mics.application.messages.TrainModelEvent;
import bgu.spl.mics.application.objects.Cluster;
import bgu.spl.mics.application.objects.DataBatch;
import bgu.spl.mics.application.objects.GPU;
import bgu.spl.mics.application.objects.Model;
import bgu.spl.mics.application.objects.Student;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Random;


/**
 * GPU service is responsible for handling the
 * {@link TrainModelEvent} and {@link TestModelEvent},
 * in addition to sending the {@link }.
 * This class may not hold references for objects which it is not responsible for.
 * <p>
 * You can add private fields and public methods to this class.
 * You MAY change constructor signatures and even add new public constructors.
 */
public class GPUService extends MicroService {

  private GPU gpu;
  private Model model;
  private boolean busy;
  private Queue<DataBatch> splittedData;
  private Event<Model> currentModelEvent;
  private Queue<TrainModelEvent> unHandledEvents;
  private final Cluster cluster = Cluster.getInstance();

  public GPUService(String name, GPU gpu) {
    super("Change_This_Name");
    this.gpu = gpu;
    busy = false;
    unHandledEvents = new LinkedList<TrainModelEvent>();
  }

  @Override
  protected void initialize() {
    this.subscribeBroadcast(
        TickBroadcast.class,
        c -> {
          gpu.tick();
          if (busy) {
            gpu.updateGPUActiveTime();
            if (gpu.isCurrentlyTraining()) {
              if (gpu.getFinishTime() == gpu.getTime()) {
                // polling dataBatch only after it is done training
                gpu.getVram().poll();
                if (!gpu.getVram().isEmpty()) {
                  gpu.trainModel(gpu.getVram().peek());
                } else {
                  // vram is empty when we're done training the model
                  model.setStatus(Model.Status.Trained);
                  busy = false;
                  gpu.setCurrentlyTraining(false);
                  complete(currentModelEvent, model);
                  gpu.addTrainedModel(model.getName());
                  // if there's a modelEvent waiting, handle it now
                  if (!unHandledEvents.isEmpty()) {
                    trainModel(unHandledEvents.poll());
                  }
                }
                if (!splittedData.isEmpty()) {
                  cluster.processData(splittedData.poll());
                }
              }
            } else { 
                // not currently Training
              if (!gpu.getVram().isEmpty()) {
                gpu.trainModel(gpu.getVram().peek());
              }
            }
          }
        }
      );

    this.subscribeEvent(
        TrainModelEvent.class,
        c -> {
          trainModel(c);
        }
      );

    this.subscribeEvent(
        TestModelEvent.class,
        c -> {
            // set the train results according to the instructions document
          Boolean isGood = null;
          Model toTest = ((TestModelEvent<Model>) c).getModel();
          Random random = new Random();
          switch (toTest.getStudent().getDegree()) {
            case MSc:
              isGood = (random.nextInt(100) < 60); // 60%
              break;
            case PhD:
              isGood = (random.nextInt(100) < 80); // 80%
              break;
          }
          toTest.setStatus(Model.Status.Tested);
          if (isGood) {
            toTest.setResults(Model.Results.Good);
          } else {
            toTest.setResults(Model.Results.Bad);
          }

          complete((TestModelEvent<Model>) c, toTest);
        }
      );

    this.subscribeBroadcast(
        CloseAllBroadcast.class,
        c -> {
          this.terminate();
        }
      );
  }

  private void trainModel(Message c) {
    if (busy = false) {
      currentModelEvent = (Event<Model>) c;
      model = ((TrainModelEvent<Model>) c).getModel();
      splittedData = gpu.splitToDataBatches(model.getData());
      int i = 0;
      // get the maximum amount of dataBatches to train on
      while ((!splittedData.isEmpty()) && i < gpu.getSize()) {
        cluster.processData(splittedData.poll());
        i++;
      }
      busy = true;
    } else {
      unHandledEvents.add((TrainModelEvent) c);
    }
  }
}
