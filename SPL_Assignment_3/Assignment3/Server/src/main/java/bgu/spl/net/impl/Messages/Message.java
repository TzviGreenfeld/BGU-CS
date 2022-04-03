package bgu.spl.net.impl.Messages;

public abstract class Message {
    protected int Opcode;
    protected int connectionId;
    public abstract void process();
}

