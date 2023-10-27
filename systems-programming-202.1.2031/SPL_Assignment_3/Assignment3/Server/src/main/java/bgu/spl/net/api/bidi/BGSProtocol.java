package bgu.spl.net.api.bidi;
import bgu.spl.net.impl.Messages.MessageHandler;
import bgu.spl.net.srv.DataBase.User;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

public class BGSProtocol implements BidiMessagingProtocol<ArrayList<String>> {

    private User user;
    private MessageHandler messageHandler;
    private boolean shouldTerminate;
    private Connections connections;
    private int connectionId;
    private ArrayList<java.lang.String> forbiddenWords;



    public BGSProtocol(ArrayList<java.lang.String> forbiddenWords){
        this.forbiddenWords = forbiddenWords;
        this.messageHandler = new MessageHandler(forbiddenWords);

    }

    @Override
    public void process(ArrayList<String> message) {
        messageHandler.process(message);

    }

    public void start(int connectionId,Connections connections){
        this.connectionId=connectionId;
        this.connections=connections;
        this.messageHandler.setconnectionId(connectionId);
    }

    public boolean shouldTerminate(){

        return shouldTerminate;
    }
    public void terminate(){
        shouldTerminate=true;
    }

}
