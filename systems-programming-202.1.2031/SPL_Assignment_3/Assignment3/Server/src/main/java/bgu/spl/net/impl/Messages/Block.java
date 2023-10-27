package bgu.spl.net.impl.Messages;

import bgu.spl.net.srv.ConnectionsImp;
import bgu.spl.net.srv.DataBase.User;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Parameters:
 * •Opcode: 12
 * •Username: the username to block
 */

public class Block extends bgu.spl.net.impl.Messages.Message {
    private User user;
    private String userNametoBloock;

    public Block(ArrayList<String> message, User user, int connectionId) {
        this.Opcode = 12;
        this.userNametoBloock = message.get(0);
        this.user = user;
        this.connectionId = connectionId;
        process();
    }

    @Override
    public void process() {
        ConnectionsImp connectionsImp = ConnectionsImp.getInstance();
        ConcurrentHashMap<String, User> databaseUsers = bgu.spl.net.srv.DataBase.DataBase.getInstance().getUsers();
        User toBlock = databaseUsers.get(userNametoBloock);
        ArrayList<String> list = new ArrayList<String>();
        if (toBlock == null || user == null) {
            //ERROR
            list.add( "1112;");
            connectionsImp.send(connectionId,list);
        }else {
            user.removeFollower(toBlock);
            user.unfollow(toBlock);
            user.getBlocked().put(userNametoBloock, toBlock);
            toBlock.getBlocking().put(user.getUserName(), user);
            toBlock.removeFollower(user);
            toBlock.unfollow(user);
            list.add("1012;");
            connectionsImp.send(connectionId, list);
        }
    }
}
