package bgu.spl.mics.application;

import bgu.spl.mics.application.objects.Cluster;
import bgu.spl.mics.application.objects.Initializer;
import bgu.spl.mics.application.services.TimeService;
import com.google.gson.Gson;
import java.io.*;

/** This is the Main class of Compute Resources Management System application. You should parse the input file,
 * create the different instances of the objects, and run the system.
 * In the end, you should output a text file.
 */

public class CRMSRunner {

  public static void main(String[] args) {
    if (args.length < 1) {
      System.out.println("Please provide json path");
    }
    // read input file
    Reader reader = null;
    try {
      reader = new FileReader(args[0]);
    } catch (FileNotFoundException e) {
      System.out.println("cant open file");
    }

    // init objects from json
    Initializer initializer = new Gson().fromJson(reader, Initializer.class);
    initializer.init();
    TimeService timeService = new TimeService(initializer.tickTime, 5000);
    Thread t = new Thread(timeService);
    t.start();

    // generate output file:
    String outputContent = Cluster.getInstance().getClusterStatistics().toString();
    try {
      File myObj = new File("output.txt");
      if (!myObj.createNewFile()) {
        System.out.println("file already exists");
      }
    } catch (IOException e) {
        e.printStackTrace();
    }
    try {
      FileWriter myWriter = new FileWriter("output.txt");
      myWriter.write(outputContent);
      myWriter.close();
    } catch (IOException e) {
        e.printStackTrace();
    }
    System.out.println(outputContent);
  }
}
