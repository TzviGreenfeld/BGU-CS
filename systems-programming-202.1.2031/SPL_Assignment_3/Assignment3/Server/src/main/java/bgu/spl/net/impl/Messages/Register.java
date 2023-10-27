package bgu.spl.net.impl.Messages;

import bgu.spl.net.srv.ConnectionsImp;
import bgu.spl.net.srv.DataBase.DataBase;
import bgu.spl.net.srv.DataBase.User;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Parameters:
 * •Opcode: 1.
 * •Username: The username to register in the server.
 * •Password: The password for the current username (used to log in to the server).
 * •Birthday: the birthday of the user (should be in the format DD-MM-YYYY)
 */
public class Register extends Message {
    private User user;
    private ArrayList<String> message;
    private String userName;
    private String passWord;
    private Integer age;
    private String[] userInfo;
    private MessageHandler msgH;



    public Register(ArrayList<String> message, int id,MessageHandler msgH) {
        this.msgH=msgH;
        this.message = message;
        for (int i = 1; i < 3; i++) {
            message.set(i, message.get(i).substring(1));
        }
        this.userName = message.get(0);
        this.connectionId = id;
        process();
    }

    @Override
    public void process() {
        ConcurrentHashMap<String, User> DBUsers = DataBase.getInstance().getUsers();
        ConnectionsImp connectionsImp = ConnectionsImp.getInstance();
        ArrayList<String> list = new ArrayList<String>();

        // userName already exists
        if (DBUsers.keySet().contains(userName)||this.msgH.register) {
            list.add("1101;");
            connectionsImp.send(this.connectionId, list);
        } else {
            this.passWord = message.get(1);
            String birthYear = message.get(2).substring(6);
            this.age = 2022 - Integer.parseInt(birthYear);
            this.user = new User(userName, age, passWord);
            user.setStatus(User.Status.REGISTER);
            DBUsers.put(userName, user);
            this.msgH.register=true;
            list.add("1001;");
            connectionsImp.send(connectionId, list);
        }
    }
}
