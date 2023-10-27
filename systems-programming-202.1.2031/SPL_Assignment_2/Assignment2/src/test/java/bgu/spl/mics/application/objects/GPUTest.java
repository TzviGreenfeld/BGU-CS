//package bgu.spl.mics.application.objects;
//
//import junit.framework.TestCase;
//import org.junit.Before;
//import org.junit.Test;
//import java.util.Collection;
//import java.util.LinkedList;
//
//public class GPUTest extends TestCase {
//    private GPU gpu;
//    private Model model;
//    private GPU.Type type;
//    private Cluster cluster;
//    private Data data;
//
//
//    @Before
//    public void setUp() {
//        data = new Data(Data.Type.Images ,3000);
//        cluster = new Cluster();
//        Student student = new Student("alice", "computer scinece", Student.Degree.MSc );
//        model = new Model("mooodle",data.getType());
////        CPU cpu = new cpu(8, , cluster);
//        gpu = new GPU(type, model, cluster);
//    }
//
//    @Test
//    public void testTick() {
//        int preTime = gpu.getTime();
//        gpu.tick();
//        assertEquals(gpu.getTime(), preTime + 1);
//    }
//
//    @Test
//    public void testGetModel() {
//        assertEquals(gpu.getModel(),model);
//    }
//
//    @Test
//    public void testGetCluster() {
//        assertEquals(gpu.getCluster(),cluster);
//    }
//
//    @Test
//    public void testSplitToDataBatches() {
//        Collection<DataBatch> dataBatches = new LinkedList<DataBatch>();
//        dataBatches = gpu.splitToDataBatches(data);
//        int expectedSize = data.getSize() / 1000; //TODO:  math.ceil?
//        assertEquals(dataBatches.size(), expectedSize);
//    }
//
//    @Test
//    public void testIsInDisk() {
//
//        DataBatch dataBatch = new DataBatch(data,0);
//        gpu.addToDisk(dataBatch);
//
//        assertTrue(gpu.isInDisk(dataBatch));
//    }
//
//    public void testGetTime() {
//        int initalTime = gpu.getTime();
//        gpu.tick();
//        assertEquals(gpu.getTime(), initalTime + 1);
//    }
//
//}