package bgu.spl.net.impl.Messages;

import bgu.spl.net.srv.ConnectionsImp;
import bgu.spl.net.srv.DataBase.User;

import java.util.ArrayList;

/**
 * Parameters:
 * • Opcode: 3.
 */
public class Logout extends Message {
private User user;
private String msg;

public Logout(User user, int connectionId){
       this.user=user;
       this.connectionId = connectionId;
       process();
    }

    public void process(){
        ConnectionsImp connectionsImp=ConnectionsImp.getInstance();
        ArrayList<String> list = new ArrayList<String>();
        if (user == null || user.getStatus() != User.Status.LOGIN) {
            list.add("1103;");
            connectionsImp.send(connectionId,list);
        }else{
            user.setStatus(User.Status.LOGOUT);
            list.add("1003;");
            connectionsImp.send(connectionId,list);

            connectionsImp.disconnect(connectionId);
        }

    }

}
