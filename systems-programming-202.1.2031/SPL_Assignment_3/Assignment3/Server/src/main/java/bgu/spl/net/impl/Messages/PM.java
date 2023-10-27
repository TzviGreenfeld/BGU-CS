package bgu.spl.net.impl.Messages;

import java.util.regex.*;

import bgu.spl.net.srv.ConnectionsImp;
import bgu.spl.net.srv.DataBase.DataBase;
import bgu.spl.net.srv.DataBase.User;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Parameters:
 * •Opcode: 6.
 * •UserName: The user to send the message to.
 * •Content: The content of the message the logged in user wants to send to the other user
 * •Sending date and time:the date and time when the message has sent (Format: DD-MM-YYYY HH:MM)
 */
public class PM extends Message {
    // TODO: PM TO SELF?
    private User sender;
    private String destUserName;
    private String content;
    private String sendingDateTime;
    private String message;
    ArrayList<String> forbiddenWords;


    public PM(ArrayList<String> msg, User sender, ArrayList<String> forbiddenWords, int connectionId) {
        this.Opcode = 6;
        this.sender = sender;
        for (int i = 1; i < 3; i++) {
            msg.set(i, msg.get(i).substring(1));
        }
        this.connectionId = connectionId;
        this.destUserName = msg.get(0);
        this.content = msg.get(1);
        this.sendingDateTime = msg.get(2);
        this.forbiddenWords = forbiddenWords;
        this.message = content + " " + sendingDateTime;

        String censorRegex = "";
        for (String word : forbiddenWords) {
            censorRegex += "|" + word;
        }
        // delete first pipe
        censorRegex = "(" +censorRegex.substring(1);
        censorRegex += ")";
        message = message.replaceAll(censorRegex, "<filtered>");
        process();
    }

    @Override
    public void process() {
        DataBase.getInstance().addMessage(sender, message);
        ConcurrentHashMap<String, User> users = DataBase.getInstance().getUsers();
        User dest = users.get(destUserName);
        ConnectionsImp connectionsImp = ConnectionsImp.getInstance();
        ArrayList<String> list = new ArrayList<String>();
        if (dest == null || sender==null || sender.isBlocked(destUserName)|| dest.isBlocked(sender.getUserName())
                || sender.getStatus() != User.Status.LOGIN || !sender.getFollowings().containsKey(destUserName)) {
            //ERROR
            list.add("1106;");
            connectionsImp.send(this.connectionId, list);
        } else if (sender.getStatus() == User.Status.LOGIN) {
            new Notification(message, sender, dest, 0);
            list.add("1006;");
            connectionsImp.send(this.connectionId, list);
        }
    }
}
