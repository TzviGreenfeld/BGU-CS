package bgu.spl.net.impl.Messages;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import bgu.spl.net.srv.ConnectionsImp;
import bgu.spl.net.srv.DataBase.DataBase;
import bgu.spl.net.srv.DataBase.User;

import java.util.HashSet;
import java.util.Set;


/**
 * Parameters:
 * • Opcode: 5.
 * • Content: The content of the message a user wants to post. The message may contain
 *
 * @<username> in order to send it to specific users other then those following the poster.
 */
public class Post extends Message {

    private User sender;
    private User[] users;
    private String message;

    public Post(ArrayList<String> msg, User user, int connectionId) {
        this.message = msg.get(0).substring(0,msg.get(0).length());
        this.sender = user;
        getTaggedUsers(message);
        this.connectionId=connectionId;
        process();
    }

    public void getTaggedUsers(String msg){
        //TODO: LAST WORD DELETED?
        ArrayList<String> tagedUserNames = new ArrayList<>();
        Pattern pattern = Pattern.compile("@.*? ");
        Matcher matcher = pattern.matcher(msg);
        while (matcher.find()) {
            // Get the matching string
            String match = matcher.group();
            tagedUserNames.add(match.substring(1, match.length()-1));
        }
        users = new User[tagedUserNames.size()];
        for (int i = 0; i < tagedUserNames.size(); i++) {
            User currUser = DataBase.getInstance().getUsers().get(tagedUserNames.get(i));
            if(currUser != null){
                users[i] = currUser;
            }
        }
    };

    public void process() {
        ConnectionsImp connectionsImp = ConnectionsImp.getInstance();
        ArrayList<String> list = new ArrayList<String>();

        if (sender==null||sender.getStatus() != User.Status.LOGIN) {
            list.add("1105;");
            connectionsImp.send(connectionId, list);
        }else{
            sender.post();
            DataBase.getInstance().addMessage(sender,message);
            list.add("1005;");
            connectionsImp.send(connectionId, list);

        }

        Set<User> readers = new HashSet<>();
        for (int i = 0; i < users.length; i++) {
            if (users[i] != null && !sender.isBlocked(users[i].getUserName()) && !users[i].isBlocked(sender.getUserName())) {
                readers.add(users[i]);
            }
        }

        for (User u : sender.getFollowers().values()) {
            readers.add(u);
        }

        for (User u : readers) {
             new Notification(message, sender, u, 1);
        }

    }
}
