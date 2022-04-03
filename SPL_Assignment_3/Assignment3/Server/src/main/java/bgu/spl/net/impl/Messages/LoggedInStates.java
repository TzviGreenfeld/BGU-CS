package bgu.spl.net.impl.Messages;

import bgu.spl.net.srv.ConnectionsImp;
import bgu.spl.net.srv.DataBase.DataBase;
import bgu.spl.net.srv.DataBase.User;

import java.util.ArrayList;

/**
 * Parameters:
 * • Opcode: 7. s
 */
/**
 * The returned ACK message will contain (for every single username) user’s age, number of posts a
 * user posted (not including PM’s), number of followers, number of users the user is following in the
 * optional section of the ACK message.
 * Example:
 * ACK-Opcode LOGSTAT-Opcode <Age><NumPosts> <NumFollowers> <NumFollowing>
 * ACK-Opcode LOGSTAT-Opcode <Age><NumPosts> <NumFollowers> <NumFollowing>
 */
public class LoggedInStates extends Message {
    User sender;
    public LoggedInStates(User sender, int connectionId) {
        this.Opcode = 7;
        this.sender = sender;
        this.connectionId = connectionId;
        process();
    }

    @Override
    public void process() {
        ConnectionsImp connectionsImp = ConnectionsImp.getInstance();
        ArrayList<String> list = new ArrayList<String>();
        if (sender == null || sender.getStatus() != User.Status.LOGIN){
            //ERROR
            list.add("1107;");
            connectionsImp.send(connectionId, list);
        } else {
            for (User user : DataBase.getInstance().getUsers().values()) {
                if (user != null && user.getStatus() == User.Status.LOGIN &&
                        !user.isBlocked(sender.getUserName()) && !sender.isBlocked(user.getUserName())) {

                    list.add("1007" + user.toStringSTAT() + ";");
                    connectionsImp.send(connectionId, list);
                    list.clear();
                    /// synchronizig the client writing
                }
            }
        }

    }
}
