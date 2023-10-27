package bgu.spl.net.srv;

import bgu.spl.net.api.bidi.BidiMessagingProtocol;
import bgu.spl.net.api.bidi.ConnectionHandler;
import bgu.spl.net.api.bidi.Connections;

import java.util.HashMap;

public class ConnectionsImp<ArrayList> implements Connections<ArrayList> {

    private HashMap<Integer, BidiMessagingProtocol> protocols;

    private HashMap<Integer, ConnectionHandler> connectionHandlers;
    private int lastId = -1;


    private static class SingletonHolder {

        private static ConnectionsImp instance = new ConnectionsImp();
    }

    public static ConnectionsImp getInstance() {

        return ConnectionsImp.SingletonHolder.instance;
    }

    private ConnectionsImp() {

        this.connectionHandlers = new HashMap<Integer, ConnectionHandler>();
        this.protocols = new HashMap<Integer, BidiMessagingProtocol>();
    }

    @Override
    public boolean send(int connectionId, Object msg) {

        ConnectionHandler toSend = this.connectionHandlers.get(connectionId);

        if (toSend != null) {
            toSend.send(msg);
        }
        return false;
    }

    @Override
    public void broadcast(Object msg) {
        for (ConnectionHandler connectionHandler : connectionHandlers.values()) {
            connectionHandler.send(msg);
        }
    }

    @Override
    public void disconnect(int connectionId) {
        ConnectionHandler connectionHandler = connectionHandlers.get(connectionId);
        try {
            BidiMessagingProtocol protocol=protocols.get(connectionId);
            protocol.shouldTerminate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        connectionHandlers.remove(connectionId);
    }

    public synchronized int add(ConnectionHandler connectionHandler, BidiMessagingProtocol protocol) {
        lastId++;

        protocols.put(lastId,protocol);
        connectionHandlers.put(lastId, connectionHandler);
        return lastId;
    }
}
