package bgu.spl.net.srv.DataBase;

import java.util.ConcurrentModificationException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ConcurrentSkipListSet;

public class User {

    public enum Status {NULL,REGISTER,LOGIN,LOGOUT};


    private int numberOfPM=0;
    private String userName;
    private String password;
    private String birthDate;
    private Status status;
    private int age;
    private int numberOfPosts=0;
    private int connectionId;

    private ConcurrentHashMap<String,User> followers;
    private ConcurrentHashMap<String,User> followings;
    private ConcurrentHashMap<String,User> blocked;
    private ConcurrentHashMap<String,User> blocking;
    private ConcurrentLinkedQueue<String> notifications;

    public User(String userName, int age,String password){
        this.userName=userName;
        this.status=Status.REGISTER;
        this.followers=new ConcurrentHashMap<String,User>();
        this.followings=new ConcurrentHashMap<String,User>();
        this.blocked=new ConcurrentHashMap<String,User>();
        this.blocking=new ConcurrentHashMap<String,User>();
        this.notifications = new ConcurrentLinkedQueue<String>();
        this.password=password;
        this.age=age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Status getStatus(){
        return this.status;
    }
    public int getConnectionId(){
        return connectionId;
    }

    public boolean addFollower(User user){
       boolean done=false;
       if(!followers.containsKey(user.getUserName())&&!blocking.containsKey(user.getUserName())){
           followers.put(user.getUserName(),user);
           done=true;       }
       return done;
    }

    public boolean follow(User user){
        boolean done=false;
        if(!followings.containsKey(user.getUserName())){
            followings.put(user.getUserName(),user);
            done=true;
        }
        return done;
    }

    public boolean removeFollower(User user){
        boolean done=false;
        if(followers.containsKey(user.getUserName())){
            followers.remove(user.getUserName());
            done=true;       }
        return done;
    }

    public boolean unfollow(User user){
        boolean done=false;
        if(followings.containsKey(user.getUserName())){
            followings.remove(user.getUserName());
            done=true;
        }
        return done;
    }

    public void block(User user){
        if(!followings.containsKey(user.getUserName())){
            followings.put(user.getUserName(),user);
        }
    }

    public String getUserName() {
        return userName;
    }

    public void setStatus(Status newStatus) {
        this.status = newStatus;
    }

    public boolean logIn(String password) {
        boolean done = false;
        if (status != Status.LOGIN && this.password == password) {
            this.status = Status.LOGIN;
            done = true;
        }
        return done;
    }

    public boolean logOut(){
        boolean done=false;
        if(status!=Status.LOGOUT){
            this.status=Status.LOGOUT;
            done=true;
        }
        return done;
    }
    public void post(){
        numberOfPosts++;
    }


    public void setConnectionId(int connectionId) {

        this.connectionId = connectionId;
    }

    public int getAge() {

        return age;
    }

    public int getNumerOfFollowers(){
        return this.followers.size();
    }

    public int getNumberOfFollowing(){
        return followings.size();
    }

    public int getNumerOfPosts() {
        return numberOfPosts;
    }

    public ConcurrentHashMap<String, User> getBlocked() {
        return blocked;
    }

    public ConcurrentHashMap<String, User> getBlocking() {
        return blocking;
    }

    public String getPassword() {
        return password;
    }

    public String toStringSTAT(){
    return age+" "+getNumerOfPosts()+" "+getNumerOfFollowers()+" "+getNumberOfFollowing();
    }

    public ConcurrentHashMap<String, User> getFollowers() {
        return followers;
    }

    public ConcurrentHashMap<String, User> getFollowings() {
        return followings;
    }

    public void addNotification(String notification) {
        this.notifications.add(notification);
    }

    public ConcurrentLinkedQueue<String> getNotifications() {
        return notifications;
    }

    public boolean isBlocked(String userName){
    return blocked.containsKey(userName);
    }


}
