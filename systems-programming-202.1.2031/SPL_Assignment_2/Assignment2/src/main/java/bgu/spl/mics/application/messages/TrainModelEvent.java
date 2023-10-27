package bgu.spl.mics.application.messages;

import bgu.spl.mics.Event;

public class TrainModelEvent<Model> implements  Event<Model>{
	
	private Model model;
	
	public TrainModelEvent(Model model) {
		this.model=model;
	}
	
	public Model getModel() {
		return this.model;
	}

}
