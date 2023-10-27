package bgu.spl.mics;

import bgu.spl.mics.example.messages.ExampleEvent;
import junit.framework.TestCase;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.concurrent.TimeUnit;

public class FutureTest extends TestCase {
    private Future<String> future;
    private Future<String> unResolvedFuture;

    @Before
    public void setUp() {
        future = new Future<String>();
        unResolvedFuture = new Future<String>();
    }

    @Test
    public void testGet() {

        String expected = "result";
        Thread t1 = new Thread(()->{
            try {
                future.get();
            }catch (Exception e){
            }
        });
        t1.start();
        assertTrue(t1.isAlive());
        future.resolve(expected);
        assertFalse(t1.isAlive());
        assertEquals(future.get(), expected);

    }

    @Test
    public void testResolve() {
        String expected = "result_2";
        future.resolve(expected);
        assertEquals("result_2", future.get());
    }

    @Test
    public void testIsDone() {
        assertFalse(unResolvedFuture.isDone());

        future.resolve("Resolved");
        assertTrue(future.isDone());
    }

    @Test
    public void testTimoutGet() {
        assertNull(unResolvedFuture.get(100, TimeUnit.MILLISECONDS));

        String expected = "result_3";
        future.resolve(null);


        Thread t2 = new Thread(()->{
            try{
                Thread.sleep(2500);
            }
            catch (InterruptedException e){
                e.printStackTrace();
            }
            future.resolve(expected);
        });

        t2.start();
        assertEquals(future.get(500, TimeUnit.MILLISECONDS), null);
        assertEquals(future.get(5000, TimeUnit.MILLISECONDS), expected);


    }
}