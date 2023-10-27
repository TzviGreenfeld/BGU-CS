package bgu.spl.mics.application.services;

import bgu.spl.mics.Future;
import bgu.spl.mics.MicroService;
import bgu.spl.mics.application.messages.*;
import bgu.spl.mics.application.objects.Model;
import bgu.spl.mics.application.objects.Model.Results;
import bgu.spl.mics.application.objects.Student;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Queue;

/**
 * Student is responsible for sending the {@link TrainModelEvent},
 * {@link TestModelEvent} and {@link PublishResultsEvent}. In addition, it must
 * sign up for the conference publication broadcasts. This class may not hold
 * references for objects which it is not responsible for.
 *
 * You can add private fields and public methods to this class. You MAY change
 * constructor signatures and even add new public constructors.
 */
public class StudentService extends MicroService {

  private enum ModelStatus {
    NULL,
    SENT_FOR_TRAIN,
    SENT_FOR_TEST,
    SENT_FOR_PUBLISH,
  }

  private Student student;
  private Queue<Model> studentModels;
  private Model currentModel;
  private Future<Model> currentFuture;
  private ModelStatus modelStatus;
  private ArrayList<Model> publishedModels;

  public StudentService(String name, Student student) {
    super(name);
    this.student = student;
    studentModels = new LinkedList<Model>();
    publishedModels = new ArrayList<Model>();

    for (int i = 0; i < student.getModels().size(); i++) {
      studentModels.add(student.getModels().get(i));
    }
    currentModel = studentModels.poll();
    modelStatus = ModelStatus.NULL;
  }

  public ArrayList<Model> getPublications() {
    synchronized (publishedModels) {} // not sure what happened here
    return publishedModels;
  }

  @Override
  protected void initialize() {
    this.subscribeBroadcast(
        PublishConferenceBroadcast.class,
        c -> {
          HashMap<Student, Integer> studentsPublishing =
            ((PublishConferenceBroadcast) c).getPublishing();

          for (Student student : studentsPublishing.keySet()) {
            if (student != this.student) {
              this.student.read(studentsPublishing.get(student));
            }
          }
        }
      );
    this.subscribeBroadcast(
        CloseAllBroadcast.class,
        c -> {
          this.terminate();
        }
      );
    this.subscribeBroadcast(
        // this is basically the student main-loop
        // the cycle is:
        // 1. ask to train a model and hold the request future
        // 2. wait for the model to be trained (= the future to be resolved) and when it does, request tesitng it. hold the future
        // 3. wait for test results. if it's good request publish and wait on this request's future, if it's bad train another model (= go back to 1)
        // 4. wait for the publish, add it to the students publications
        
        TickBroadcast.class,
        c -> {
          if (currentModel != null) {
            switch (modelStatus) {
              case NULL:
                TrainModelEvent<Model> trainModel = new TrainModelEvent<Model>(
                  currentModel
                );
                currentFuture = sendEvent(trainModel);
                modelStatus = ModelStatus.SENT_FOR_TRAIN;
                break;

              case SENT_FOR_TRAIN:
                if (currentFuture.isDone()) {
                  TestModelEvent<Model> testModel = new TestModelEvent<Model>(
                    currentModel
                  );
                  currentFuture = sendEvent(testModel);
                  modelStatus = ModelStatus.SENT_FOR_TEST;
                }
                break;

              case SENT_FOR_TEST:
                if (currentFuture.isDone()) {
                  if (currentModel.getResults() == Results.Good) {
                    PublishResultsEvent<Model> publishModel = new PublishResultsEvent<Model>(
                      currentModel
                    );
                    currentFuture = sendEvent(publishModel);
                    modelStatus = ModelStatus.SENT_FOR_PUBLISH;
                  } else {
                    //in case results are bad we are done with this model and move to the next
                    currentModel = studentModels.poll();
                    modelStatus = ModelStatus.NULL;
                  }
                }
                break;

              case SENT_FOR_PUBLISH:
                if (currentFuture.isDone()) {
                  student.addPublishedModel(currentModel);
                  currentModel = studentModels.poll();
                  modelStatus = ModelStatus.NULL;
                }
                break;

            }
          }
        }
      );
  }
}
