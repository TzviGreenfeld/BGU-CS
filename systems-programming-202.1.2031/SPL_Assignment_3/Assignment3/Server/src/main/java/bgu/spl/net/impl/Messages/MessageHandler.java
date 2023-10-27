package bgu.spl.net.impl.Messages;
import bgu.spl.net.srv.DataBase.User;

import java.util.ArrayList;
// Register Login Logout FollowUnfollow Post PM LoggedInStates Stats Notification Ack Error Block

public class MessageHandler {
    private User sender;
    ArrayList<String> forbiddenWords;
    private int connectionId;
    public Boolean register=false;


    public MessageHandler(ArrayList<String> forbiddenWords) {
        this.forbiddenWords = forbiddenWords;
    }


    public void process(ArrayList<String> decodedMessage){

        Message msg;
        Integer Opcode = Integer.valueOf(decodedMessage.get(0).substring(0,2));
        decodedMessage.set(0,decodedMessage.get(0).substring(2));

        switch (Opcode){
            case 1:
                msg = new Register(decodedMessage,connectionId,this);
                break;
            case 2:
                msg = new Login(decodedMessage, this, connectionId);
                break;
            case 3:
                msg = new Logout(sender, connectionId);
                break;
            case 4:
                msg = new FollowUnfollow(decodedMessage, sender, connectionId);
                break;
            case 5:
                msg = new Post(decodedMessage, sender, connectionId);
                break;
            case 6:
                msg = new PM(decodedMessage, sender, forbiddenWords, connectionId);
                break;
            case 7:
                msg = new LoggedInStates(sender, connectionId);
                break;
            case 8:
                msg = new Stats(decodedMessage, sender, connectionId);
                break;
            case 12:
                msg = new Block(decodedMessage, sender, connectionId);
                break;
        }
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public void setconnectionId(int connectionId) {
        this.connectionId = connectionId;
    }
}


