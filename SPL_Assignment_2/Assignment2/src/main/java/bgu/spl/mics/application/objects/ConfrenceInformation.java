package bgu.spl.mics.application.objects;

import bgu.spl.mics.application.services.ConferenceService;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

/**
 * Passive object representing information on a conference.
 * Add fields and methods to this class as you see fit (including public methods and constructors).
 */
public class ConfrenceInformation {
    @SerializedName("name")
    @Expose
    private String name;

    @SerializedName("date")
    @Expose
    private int publishDate;
    private Thread conferenceServiceThread;

    private ConferenceService myConferenceService;
    private ArrayList<Model> goodModels;

    public ConfrenceInformation(String name, int publishDate) {
        this.name = name;
        this.publishDate = publishDate;
    }

    public void init(String name){
        myConferenceService = new ConferenceService(name + " ConfrenceService",this);
        Thread t = new Thread(myConferenceService);
        conferenceServiceThread = t;
        t.start();
    }

    public Thread getConferenceServiceThread() {
        return conferenceServiceThread;
    }

    public String getName() {
        return name;
    }

    public int getPublishDate() {
        return publishDate;
    }

    public int getGoodModelsSize() {
        return goodModels.size();
    }

    public void clearPublishedModels(){
        goodModels.clear();
    }
}
