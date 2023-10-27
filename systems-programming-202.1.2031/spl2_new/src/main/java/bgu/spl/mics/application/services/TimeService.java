package bgu.spl.mics.application.services;

import bgu.spl.mics.*;
import bgu.spl.mics.application.messages.CloseAllBroadcast;
import bgu.spl.mics.application.messages.TickBroadcast;

import java.util.Timer;
import java.util.TimerTask;

/**
 * TimeService is the global system timer There is only one instance of this micro-service.
 * It keeps track of the amount of ticks passed since initialization and notifies
 * all other micro-services about the current time tick using {@link TickBroadcast}.
 * This class may not hold references for objects which it is not responsible for.
 * <p>
 * You can add private fields and public methods to this class.
 * You MAY change constructor signatures and even add new public constructors.
 */
public class TimeService extends MicroService {
	private int speed;
	private int date = 0;
	private int endOfTime;
	private Timer timer;

	public TimeService(int TickTime, int endOfTime) {
		super("TimeService");
		this.speed = TickTime;
		this.endOfTime = endOfTime;
	}


	// clock tick
	private void tick() {
		if (date != endOfTime) {
			date = date + 1;
			TickBroadcast tickBroadcast = new TickBroadcast();
			sendBroadcast(tickBroadcast);
		} else {
			// reached program duration
			timer.cancel();
			timer.purge();
			sendBroadcast(new CloseAllBroadcast());
		}
	}

	@Override
	protected void initialize() {
		// using the built in java timer
		timer = new Timer("TimeService", false); 
		TimerTask updateTime = new TimerTask() {
			@Override
			public void run() {
				tick();
			}
		};
		timer.schedule(updateTime, 0, speed);
		this.subscribeBroadcast(CloseAllBroadcast.class, c -> {
			this.terminate();
		});

	}

}
