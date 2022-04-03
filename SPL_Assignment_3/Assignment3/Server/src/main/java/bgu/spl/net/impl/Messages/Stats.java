package bgu.spl.net.impl.Messages;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Pattern;

import bgu.spl.net.srv.ConnectionsImp;
import bgu.spl.net.srv.DataBase.User;
import bgu.spl.net.srv.DataBase.DataBase;

/**
 * Parameters:
 * • Opcode:8.
 * • List of usernames: The list of userswhose stats will be returned to the client.
 */
public class Stats extends Message {
    private static final int Opcode = 8;
    private String[] users;
    private User sender;


    public Stats(ArrayList<String> message, User user, int connectionId) {
        this.sender = user;
        users = message.get(0).split(Pattern.quote("|"));
        this.connectionId = connectionId;
        process();
    }

    private boolean isLegalList() {
        // returns false if any of there is any blocking between users the sender requsted and the sende himself or username dosent exists

        ConcurrentHashMap<String, User> databaseUsers = DataBase.getInstance().getUsers();
        for (int i = 0; i < users.length; i++) {
            if (databaseUsers.containsKey(users[i])) {
                User currUser = databaseUsers.get(users[i]);
                if (currUser.isBlocked(sender.getUserName()) || sender.isBlocked(currUser.getUserName())) {
                    users[i] = null;
                }
            } else {
                return false;
            }
        }
        return true;
    }

    public void process() {
        ConnectionsImp connectionsImp = ConnectionsImp.getInstance();
        String additionalInfo = "";
        ConcurrentHashMap<String, User> databaseUsers = DataBase.getInstance().getUsers();
        Message[] result = new Message[users.length];
        ArrayList<String> list = new ArrayList<String>();

        if (sender == null || sender.getStatus() != User.Status.LOGIN || !isLegalList()) {
            //ERROR
            list.add("1108;");
            connectionsImp.send(connectionId, list);
        } else {
            for (int i = 0; i < users.length; i++) {
                if (users[i] != null) {
                    User user = databaseUsers.get(users[i]);
                    if (user != null) {
                        if (!sender.getBlocking().containsKey(user.getUserName())) {
                            list.clear();
                            list.add("1008" + user.toStringSTAT() + ";");
                            connectionsImp.send(connectionId, list);
                        }
                    }
                }
            }
        }
    }
}
