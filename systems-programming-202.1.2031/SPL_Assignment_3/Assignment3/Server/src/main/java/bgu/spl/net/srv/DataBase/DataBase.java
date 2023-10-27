package bgu.spl.net.srv.DataBase;

import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;

import bgu.spl.net.srv.DataBase.User;

public class DataBase {


    private ConcurrentHashMap<String, User> users;
    private ConcurrentHashMap<User, Queue<String>> message;

    private DataBase() {
        users = new ConcurrentHashMap<String, User>();
        message = new ConcurrentHashMap<User, Queue<String>>();
    }


    private static class SingletonHolder {
        private static DataBase instance = new DataBase();
    }

    public static DataBase getInstance() {
        return SingletonHolder.instance;
    }

    public ConcurrentHashMap<String, User> getUsers() {
        return users;
    }

    public boolean addUser(User user) {
        boolean done = false;
        if (!users.containsKey(user.getUserName())) {
            users.put(user.getUserName(), user);
            done = true;
        }
        return done;
    }

    public boolean removeUser(User user) {
        boolean done = false;
        if (users.containsKey(user.getUserName())) {
            users.remove(user.getUserName());
            done = true;
        }
        return done;

    }

    public boolean logIn(String userName, String password) {
        boolean done = false;
        User user = users.get(userName);
        if (user != null) {
            done = user.logIn(password);
        }
        return done;
    }

    public User verifyLogin(String userName, String password) {
        User user = users.get(userName);
        if (user != null) {
            if (password.equals(user.getPassword())){
                return user;
            }
        }
        return null;
    }

    public boolean logOut(String userName) {
        boolean done = false;
        User user = users.get(userName);
        if (user != null) {
            done = user.logOut();
        }
        return done;
    }

    public void addMessage(User user, String message) {
    Queue<String> q= this.message.get(user);
    if(q==null){
        q=new LinkedList<String>();
        this.message.put(user, q);
    }
    q.add(message);
    }



}
