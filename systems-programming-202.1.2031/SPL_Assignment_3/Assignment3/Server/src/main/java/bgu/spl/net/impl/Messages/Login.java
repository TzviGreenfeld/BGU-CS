package bgu.spl.net.impl.Messages;

import bgu.spl.net.srv.ConnectionsImp;
import bgu.spl.net.srv.DataBase.DataBase;
import bgu.spl.net.srv.DataBase.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Parameters:
 * •Opcode: 2.
 * •Username: The username to log in the server.
 * •Password: The password for the current username (used to log in to the server).
 * •Captcha: is to simulate captcha (must be 1, for successful login)
 */
public class Login extends Message {
    private String username;
    private String password;
    private Integer captcha;
    private User sender;
    private MessageHandler messageHandler;

    public Login(ArrayList<String> message, MessageHandler messageHandler, int connectionId) {

        for (int i = 1; i < 3; i++) {
            message.set(i, message.get(i).substring(1));
        }
        this.Opcode = 2;
        this.sender = sender;
        this.username = message.get(0);
        this.password = message.get(1);
        this.captcha = Integer.valueOf(message.get(2));
        this.messageHandler = messageHandler;
        this.connectionId = connectionId;
        process();
    }

    /**
     * If the user doesn’t exist or the password
     * doesn’t match the one entered for the username, sends an ERROR message. An ERROR message
     * should also appear if the current client has already succesfully logged in.
     * An ERROR message should appear also if the captcha byte is 0.
     */
    @Override
    public void process() {
         sender = DataBase.getInstance().verifyLogin(username,password);

        ConcurrentHashMap<String, User> users = DataBase.getInstance().getUsers();
        ConnectionsImp connectionsImp = ConnectionsImp.getInstance();
        ArrayList<String> list = new ArrayList<String>();

        if (captcha == 0 || sender == null||sender.getStatus()==User.Status.LOGIN){
            //ERROR
            list.add("1102;");
            connectionsImp.send(connectionId, list);
        } else {
            sender.setStatus(User.Status.LOGIN);

            messageHandler.setSender(sender);

            while (!sender.getNotifications().isEmpty() && sender.getStatus() == User.Status.LOGIN) {
                list.clear();
                list.add(sender.getNotifications().poll());
                connectionsImp.send(connectionId, list);
            }
            list.clear();
            list.add("1002;");
            sender.setConnectionId(connectionId);
            connectionsImp.send(connectionId, list);
        }

    }
}
