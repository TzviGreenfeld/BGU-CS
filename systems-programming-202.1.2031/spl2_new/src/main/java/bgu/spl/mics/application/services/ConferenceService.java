package bgu.spl.mics.application.services;

import bgu.spl.mics.MicroService;
import bgu.spl.mics.application.messages.PublishConferenceBroadcast;
import bgu.spl.mics.application.messages.PublishResultsEvent;
import bgu.spl.mics.application.messages.TickBroadcast;
import bgu.spl.mics.application.objects.ConfrenceInformation;
import bgu.spl.mics.application.objects.Model;
import bgu.spl.mics.application.objects.Student;
import java.util.HashMap;

/**
 * Conference service is in charge of
 * aggregating good results and publishing them via the {@link PublishConferenceBroadcast},
 * after publishing results the conference will unregister from the system.
 * This class may not hold references for objects which it is not responsible for.
 *
 * You can add private fields and public methods to this class.
 * You MAY change constructor signatures and even add new public constructors.
 */
public class ConferenceService extends MicroService {

  // father conference is the ConfrenceInformation instance that this runnable is doing the work for
  private ConfrenceInformation fatherConfrence;
  int date = 0;
  int publishDate;
  // counter of students publications
  HashMap<Student, Integer> studentsPublishing;

  public ConferenceService(String name, ConfrenceInformation fatherConfrence) {
    super(name);
    this.fatherConfrence = fatherConfrence;
    this.publishDate = fatherConfrence.getPublishDate();
  }

  private void updateTime() {
    date++;
    if (date == publishDate) {
        // every conference only publish once when the clock hits the pre-determined number of ticks
      sendBroadcast(new PublishConferenceBroadcast(studentsPublishing));
      this.terminate();
    }
  }

  @Override
  protected void initialize() {
    // we use callback to update the timer
    // every time a TickBroadcast is received, updateTime() is called

    // 'this' is the abstract class MicroService
    this.subscribeBroadcast(
        TickBroadcast.class,
        c -> {
          updateTime();
        }
      );
    // wait for publish, then update the number of publications in the specific student entry
    this.subscribeEvent(
        PublishResultsEvent.class,
        c -> {
          Model model = ((PublishResultsEvent<Model>) c).getModel();
          Student student = model.getStudent();

          Integer publishing = studentsPublishing.get(student);
          if (publishing != null) {
            publishing++;
          } else {
            studentsPublishing.put(student, 1);
          }
          complete((PublishResultsEvent<Model>) c, model);
        }
      );
  }
}
