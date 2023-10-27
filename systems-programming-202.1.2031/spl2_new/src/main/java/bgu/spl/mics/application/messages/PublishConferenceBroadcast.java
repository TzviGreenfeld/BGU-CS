package bgu.spl.mics.application.messages;

import bgu.spl.mics.Broadcast;
import bgu.spl.mics.application.objects.Student;

import java.util.HashMap;

public class PublishConferenceBroadcast implements Broadcast {
	
	private final HashMap<Student,Integer> publishing;
	
	public PublishConferenceBroadcast(HashMap<Student,Integer> publishing) {
		this.publishing = publishing;
	}

	public HashMap<Student, Integer> getPublishing() {
		return publishing;
	}
}
