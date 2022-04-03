package bgu.spl.net.impl.rci;


import bgu.spl.net.api.bidi.BidiMessagingProtocol;
import bgu.spl.net.api.bidi.Connections;

import java.io.Serializable;

public class RemoteCommandInvocationProtocol<T> implements BidiMessagingProtocol<Serializable> {

    private T arg;

    public RemoteCommandInvocationProtocol(T arg) {
        this.arg = arg;
    }

    @Override
    public void start(int connectionId, Connections<Serializable> connections) {

    }

    @Override
    public void process(Serializable msg) {
//        return ((Command) msg).execute(arg);
        System.out.println(msg);
    }

    @Override
    public boolean shouldTerminate() {
        return false;
    }

}
