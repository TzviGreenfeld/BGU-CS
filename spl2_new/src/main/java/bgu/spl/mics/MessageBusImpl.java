package bgu.spl.mics;

import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;

/**
 * The {@link MessageBusImpl class is the implementation of the MessageBus interface.
 * Write your implementation here!
 * Only private fields and methods can be added to this class.
 */
public class MessageBusImpl implements MessageBus {

  private static class MessageBusSingletonHolder {

    // implementation of concurrent singleton
    private static MessageBusImpl messageBusInstance = null;
  }

  public static MessageBusImpl getInstance() {
    // lazy initiation
    if (MessageBusSingletonHolder.messageBusInstance == null) {
      // will only synchronize on the first time
      synchronized (MessageBusSingletonHolder.class) {
        MessageBusSingletonHolder.messageBusInstance = new MessageBusImpl();
      }
    }
    return MessageBusSingletonHolder.messageBusInstance;
  }

  private ConcurrentHashMap<MicroService, Queue<Message>> messages;
  private ConcurrentHashMap<Class<?>, Queue<MicroService>> microServices;
  private ConcurrentHashMap<Event, Future> futures;

  private MessageBusImpl() {
    // map microservice to its msg queue
    this.messages = new ConcurrentHashMap<>();
    // map runnable (we use ? because of lambdas) to microservice,
    // (action, MS) in the map means that the microservice MS should do the action called "action"
    this.microServices = new ConcurrentHashMap<>();
    // map events to future, so the bus can retrieve the result ("future") of the event
    this.futures = new ConcurrentHashMap<>();
  }

  protected ConcurrentHashMap<MicroService, Queue<Message>> getMessages() {
    return messages;
  }

  protected ConcurrentHashMap<Class<?>, Queue<MicroService>> getMicroServices() {
    return microServices;
  }

  protected ConcurrentHashMap<Event, Future> getFutures() {
    return futures;
  }

  @Override
  public <T> void subscribeEvent(
    Class<? extends Event<T>> type,
    MicroService m
  ) {
    // add microservice to the queue of an event he requested.
    // if this microservice is the first to subscribe to this type of event,
    // qw init new queue and put the event type and new queue in the appropriate hashmap
    Queue<MicroService> q = new LinkedList<>();
    if (microServices.containsKey(type)) {
      q = microServices.get(type);
      q.add(m);
    } else {
      q.add(m);
      microServices.put(type, q);
    }
    microServices.notifyAll();
  }

  @Override
  public void subscribeBroadcast(
    Class<? extends Broadcast> type,
    MicroService m
  ) {
    // same idea as subscribeEvent, but with broadcasts
    // the microservice queue has both events and broadcasts as keys
    Queue<MicroService> q = new LinkedList<>();
    if (microServices.containsKey(type)) {
      q = microServices.get(type);
      q.add(m);
    } else {
      q.add(m);
      microServices.put(type, q);
    }
  }

  @Override
  @SuppressWarnings("unchecked")
  public <T> void complete(Event<T> e, T result) {
    // if event is completed, we need to resolve its future in order to set
    // its result to the new value
    Future<T> future = futures.get(e);
    future.resolve(result);
  }

  @Override
  public void sendBroadcast(Broadcast b) {
    // we are sending the broadcast b by following these steps:

    // loop over the messages(event/broadcast) that has subscribers
    for (Class c : microServices.keySet()) {
      // if this is the type we are looking to send
      if (c == b.getClass()) {
        // get all the subscribers of this event
        for (MicroService m : microServices.get(c)) {
          // add the broadcast to awaiting messages of those microservices
          messages.get(m).add(b);
        }
      }
    }
  }

  @Override
  public <T> Future<T> sendEvent(Event<T> e) {
    // same idea as sendBroadcast
    Future<T> future = new Future<T>();
    // get the microservices that are subscribed to this event type
    for (Class c : microServices.keySet()) {
      if (c == e.getClass()) {
        // get the first microservice that is subscribed
        MicroService m = microServices.get(c).poll();
        // add the event to that microservice queue
        messages.get(m).add(e);
        // add the microservice to the events queue again (round robin)
        microServices.get(c).add(m);
      }
    }
    // finally, now that we sent event we need to save its future
    futures.put(e, future);

    return future;
  }

  @Override
  public void register(MicroService m) {
    // if the given microservice not already has a message-queue, make one
    if (!messages.contains(m)) {
      Queue<Message> msgQ = new LinkedList<>();
      messages.put(m, msgQ);
    }
  }

  @Override
  public void unregister(MicroService m) {
	// simply removes the given microservice from both
	// message-to=microservice queue and from the microservice-to-message queue
    if (messages.containsKey(m)) {
      messages.remove(m);
      for (Queue<MicroService> q : microServices.values()) {
        if (q.contains(m)) {
          q.remove(m);
        }
      }
    }
  }

  @Override
  public Message awaitMessage(MicroService m) throws InterruptedException {
    // this is an implementation of blocking queue with busy wait
    // in case a microservice wants to wait for message
    Queue<? extends Message> q = messages.get(m);
    while (q.isEmpty()) {
      try {
        messages.wait();
        q = messages.get(m);
      } catch (InterruptedException e) {}
    }
    Message message = q.poll();

    return message;
  }
}
