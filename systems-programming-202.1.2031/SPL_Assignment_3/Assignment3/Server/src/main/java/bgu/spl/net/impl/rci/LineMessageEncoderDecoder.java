package bgu.spl.net.impl.rci;

import bgu.spl.net.api.MessageEncoderDecoder;

import java.util.ArrayList;
import java.util.Arrays;
import java.nio.charset.*;

public class LineMessageEncoderDecoder implements MessageEncoderDecoder<ArrayList<String>> {

    private byte[] bytes = new byte[1 << 10]; //start with 1k
    private int len = 0;
    private ArrayList<String> args = new ArrayList<String>();

    @Override
    public ArrayList<String> decodeNextByte(byte nextByte) {
        //notice that the top 128 ascii characters have the same representation as their utf-8 counterparts
        //this allow us to do the following comparison

        if (nextByte == 0){
            args.add(popString());
        }
        if (nextByte == ';') {
            args.add(popString());
            ArrayList<String> argsCopy=new ArrayList<>(args);
            args.clear();
            return argsCopy;
        }
        pushByte(nextByte);
        return null; //not a msg yet
    }

    @Override
    public byte[] encode(ArrayList<String> message) {

        return (message.get(0) + ";").getBytes(); //uses utf8 by default
    }
    private void pushByte(byte nextByte) {
        if (len >= bytes.length) {
            bytes = Arrays.copyOf(bytes, len * 2);
        }
        bytes[len++] = nextByte;
    }

    private String popString() {
        //notice that we explicitly requesting that the string will be decoded from UTF-8
        //this is not actually required as it is the default encoding in java.
        String result = new String(bytes, 0, len, StandardCharsets.UTF_8);
        len = 0;
        return result;
    }
}