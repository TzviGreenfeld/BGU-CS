package bgu.spl.mics;

import java.util.concurrent.TimeUnit;

/**
 * A Future object represents a promised result - an object that will
 * eventually be resolved to hold a result of some operation. The class allows
 * Retrieving the result once it is available.
 *
 * Only private methods may be added to this class.
 * No public constructor is allowed except for the empty constructor.
 */
public class Future<T> {

  private T result;
  public boolean isResolved;

  /**
   * This should be the the only public constructor in this class.
   */
  public Future() {
    // No public constructor is allowed except for the empty constructor.

    result = null;
    isResolved = false;
  }

  /**
   * retrieves the result the Future object holds if it has been resolved.
   * This is a blocking method! It waits for the computation in case it has
   * not been completed.
   * <p>
   * @return return the result of type T if it is available, if not wait until it is available.
   *
   */
  public synchronized T get() {
	// busy wait for it to be resolved
    try {
      while (!isResolved) {
        wait();
      }
    } catch (InterruptedException e) {
      e.printStackTrace();
    }

    return result;
  }

  /**
   * Resolves the result of this Future object.
   */
  public synchronized void resolve(T result) {
	// set the result and let anyone in the busy wait know its done
    if (!isResolved) {
      this.result = result;
      isResolved = true;
      notifyAll();
    }
  }

  /**
   * @return true if this object has been resolved
   */
  public boolean isDone() {
    return isResolved;
  }

  /**
   * retrieves the result the Future object holds if it has been resolved,
   * This method is non-blocking, it has a limited amount of time determined
   * by {@code timeout}
   * <p>
   * @param timout 	the maximal amount of time units to wait for the result.
   * @param unit		the {@link TimeUnit} time units to wait.
   * @return return the result of type T if it is available, if not,
   * 	       wait for {@code timeout} TimeUnits {@code unit}. If time has
   *         elapsed, return null.
   */
  public T get(long timeout, TimeUnit unit) {
	// this method is never used but is part of the interface, this is just some dummy implmentation.
    /// TOOD: Change implementation
    if (!isResolved) {
      try {
        unit.sleep(timeout);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }
    return result;
  }
}
