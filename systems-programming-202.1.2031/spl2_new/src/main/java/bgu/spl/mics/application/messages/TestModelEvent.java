package bgu.spl.mics.application.messages;

import bgu.spl.mics.Event;
import bgu.spl.mics.application.objects.Model;

public class TestModelEvent<Model>  implements  Event<Model>{
	
private Model model;
	
	public TestModelEvent(Model model) {
		this.model=model;
	}
	
	public Model getModel() {
		return this.model;
	}
}
