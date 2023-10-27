package bgu.spl.net.impl.Messages;
import bgu.spl.net.impl.Messages.Message;
import bgu.spl.net.srv.ConnectionsImp;
import bgu.spl.net.srv.DataBase.User;

import java.util.ArrayList;

import static java.lang.Integer.parseInt;

/**
 * Parameters:
 * • Opcode: 9.
 * • NotificationType : indicates whether the message is a PM message (0) or a public message (post)
 * (1).
 * • PostingUser: The user who poster/sent the message.
 * • Content: The message that was posted/sent.
 */
public class Notification extends Message {
    private Integer intMessageType;
    private User postingUser;
    private String content;
    private User userToNotify;

    public Notification(String message, User postingUser, User userToNotify, int msgType) {
        this.userToNotify = userToNotify;
        intMessageType = msgType;
        this.postingUser = postingUser;
        this.content = message;
        this.connectionId = connectionId;
        process();
    }


    @Override
    public void process() {
        ArrayList<String> list = new ArrayList<String>();
        String notification = "09" + intMessageType.toString() + '\0' + postingUser.getUserName() + '\0' + content + "\0;";
        if (userToNotify.getStatus() == User.Status.LOGOUT||userToNotify.getStatus() == User.Status.REGISTER){
            userToNotify.addNotification(notification);
        }
        else if(userToNotify.getStatus() == User.Status.LOGIN) {
            list.add(notification);
            ConnectionsImp.getInstance().send(userToNotify.getConnectionId(),list);
        }
    }
}
