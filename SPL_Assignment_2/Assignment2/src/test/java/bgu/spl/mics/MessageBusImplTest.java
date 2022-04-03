//package bgu.spl.mics;
//
//import junit.framework.TestCase;
//import org.junit.Before;
//import org.junit.Test;
//
//
//public class MessageBusImplTest extends TestCase {
//
//    private MicroService microService;
//    private MicroService microService2;
//    private testEvent event;
//    private MessageBusImpl messageBus;
//    private Broadcast broadcast;
//    private Future<String> future;
//    private Callback callBack;
//
//
//    @Before
//    public void setUp() {
//
//        microService = new StudentService("Bruce Wayne");
//        microService2 = new StudentService("Batman");
//        event = new testEvent("Bane");
//        messageBus = MessageBusImpl.getInstance();
//        broadcast = new testBroadcast("Clark");
//        callBack = (Message) -> { };
////        future = new Future("Future");
//    }
//
//    @Test
//    public void testSubscribeEvent() {
//        messageBus.register(microService);
//        microService.subscribeEvent(event.getClass(), callBack);
//        assertTrue(messageBus.isSubscribedEvent(microService,event));
//    }
//
//    @Test
//    public void testSubscribeBroadcast() {
//        messageBus.register(microService);
//        microService.subscribeBroadcast(broadcast.getClass(), callBack);
//        assertTrue(messageBus.isBroadcastRegistred(microService, broadcast));
//    }
//
//    @Test
//    public void testComplete() {
//        String result = "result";
//        future = messageBus.sendEvent(event);
//        messageBus.complete(event, result);
//        assertEquals(future, result);
//    }
//
//    @Test
//    public void testSendBroadcast() {
//        messageBus.sendBroadcast(broadcast);
//        assertTrue(messageBus.isSentBroadcast(microService, broadcast));
//
//    }
//
//    @Test
//    public void testSendEvent() {
//        assertTrue(messageBus.isSentEvent(event, microService));
//    }
//
//    @Test
//    public void testRegister() {
//        messageBus.register(microService);
//        assertTrue(messageBus.isMicroServiceRegistred(microService));
//        messageBus.unregister(microService);
//    }
//
//    @Test
//    public void testUnregister() {
//        messageBus.register(microService);
//        messageBus.unregister(microService);
//        assertFalse(messageBus.isMicroServiceRegistred(microService));
//        };
//
//
//    @Test
//    public void testAwaitMessage() {
//        messageBus.register(microService);
//        microService.subscribeEvent(event.getClass(), callBack);
//        messageBus.subscribeEvent(event.getClass(), microService);
//        microService2.sendEvent(event);
//
//        assertTrue(messageBus.isRecivedMessage(microService, event));
//    }
//
//
//
//    public class testEvent implements Event<String> {
//
//        private String name;
//
//        public testEvent(String name) {
//            this.name = name;
//        }
//
//        public String getName() {
//            return name;
//        }
//
//    }
//
//    public class testBroadcast implements Broadcast {
//
//        private String name;
//
//        public testBroadcast(String name) {
//            this.name = name;
//        }
//
//        public String getName() {
//            return name;
//        }
//
//    }
//
//}
