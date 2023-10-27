package bgu.spl.net.impl.Messages;

import bgu.spl.net.srv.ConnectionsImp;
import bgu.spl.net.srv.DataBase.DataBase;
import bgu.spl.net.srv.DataBase.User;

import java.util.ArrayList;

/**
 * Parameters:
 * • Opcode: 4.
 * • Follow/Unfollow: This parameter has a value of 0 when a user wants to follow, otherwise it has a
 * value of 1(Unfollow).
 * • UserName: The requested user name to follow/unfollow.
 */

public class FollowUnfollow extends Message {
    private User user;
    private final int Opcode;
    private Integer followUnfollw;
    private String userNameToAct;

    public FollowUnfollow(ArrayList<String> msg, User user, int connectionId) {
            //040 Mortneey\0;
        this.Opcode = 4;
        this.user = user;
        followUnfollw = Integer.valueOf(msg.get(0).charAt(0) - 48);
//        userNameToAct = msg.get(0).substring(1,msg.get(0).length()-1);
        userNameToAct = msg.get(0).substring(1);


        this.connectionId = connectionId;
        process();
    }

    public void process() {
        ConnectionsImp connectionsImp = ConnectionsImp.getInstance();
        boolean isDone = false;
        ArrayList<String> list = new ArrayList<String>();
        if(user == null || DataBase.getInstance().getUsers().get(userNameToAct) == null) {
            //ERROR
            User user2=DataBase.getInstance().getUsers().get(userNameToAct);
        
            list.add("1104;");
            connectionsImp.send(connectionId,list);

        }
        else if (user.getStatus() == User.Status.LOGIN) {
            User userToAct = DataBase.getInstance().getUsers().get(userNameToAct);

            if (followUnfollw == 0) {
                isDone = user.follow(userToAct) && userToAct.addFollower(user);
            
            } else {
                isDone = user.unfollow(userToAct) && userToAct.removeFollower(user);
            }
            if (isDone) {
                list.add( "1004" + userNameToAct + "\0;");
                connectionsImp.send(connectionId,list);
            } else {
                //ERROR
                list.add("1104;");
            
                connectionsImp.send(connectionId,list);
            }


        }
    }
}
