//package bgu.spl.mics.application.objects;
//
//import junit.framework.TestCase;
//import org.junit.Before;
//import org.junit.Test;
//
//import java.util.Collection;
//import java.util.LinkedList;
//import java.util.Queue;
//
//public class CPUTest extends TestCase {
//    //    private GPU gpu;
//    private Model model;
//    private GPU.Type type;
//    private Cluster cluster;
//    private Data data;
//    private CPU cpu;
//    private Queue<DataBatch> queue;
//    private int cores;
//
//
//    @Before
//    public void setUp() {
//        data = new Data(Data.Type.Images, 3000);
//        cluster = Cluster.getInstance();
//        Student student = new Student("alice", "computer science", Student.Degree.MSc, 0,0,new Model[]);
//        model = new Model("moodle", data, student);
//        cores = 8;
//        Collection<DataBatch> dataBatches = new LinkedList<DataBatch>();
//        DataBatch batch = new DataBatch(data, 0);
//        dataBatches.add(batch);
//        cpu = new CPU(cores);
//    }
//
//
//    @Test
//    public void testGetData() {
//        assertEquals(cpu.getData(), data);
//    }
//
//    @Test
//    public void testGetTime() {
//        int preTime = cpu.getTime();
//        cpu.tick();
//        assertEquals(cpu.getTime(), preTime + 1);
//    }
//
//    @Test
//    public void testTick() {
//        //  inital time is 1
//        cpu.tick();
//        assertEquals(cpu.getTime(), 2);
//    }
//
//
////    @Test
////    public void testSetProcessedData() {
////        Collection<Data> colData = new LinkedList<>();
////        assertEquals(cpu.getProcessedData(), colData);
////    }
//
//
////    @Test
////    public void testAddToQueue() {
////    cpu.
////    }
//}