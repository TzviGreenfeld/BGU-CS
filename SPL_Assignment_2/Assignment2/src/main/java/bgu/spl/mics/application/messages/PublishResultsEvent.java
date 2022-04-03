package bgu.spl.mics.application.messages;
import bgu.spl.mics.Event;

public class PublishResultsEvent<Model> implements  Event<Model> {
	
private Model model;
	
	public PublishResultsEvent(Model model) {
		this.model=model;
	}
	
	public Model getModel() {
		return this.model;
	}
	

}
