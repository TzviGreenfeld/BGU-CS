package bgu.spl.mics.application;

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

        if (args.length < 1){
            System.out.println("Please provide json path");
        }
        // read input file
        Reader reader = null;
        try {
            reader = new FileReader(args[0]);
        } catch (FileNotFoundException e) {
            System.out.println("cant open file");
        }

        // init objects
        Initializer initializer = new Gson().fromJson(reader, Initializer.class);
        initializer.init();
//        TimeService timeService = new TimeService(initializer.tickTime, initializer.duration);
        TimeService timeService = new TimeService(initializer.tickTime, 5000);
        Thread t = new Thread(timeService);
        t.start();


        ///output file:
        try {
            File myObj = new File("output.txt");
            if ( ! myObj.createNewFile()) {
                System.out.println("file already exists");
            }
        } catch (IOException e) {
//            e.printStackTrace();
        }
        try {
            FileWriter myWriter = new FileWriter("output.txt");
            myWriter.write("this is the content of the file");
            myWriter.close();
        } catch (IOException e) {
//            e.printStackTrace();
        }

//        System.out.println(Cluster.getInstance().getClusterStatistics().toString());
    }
}

