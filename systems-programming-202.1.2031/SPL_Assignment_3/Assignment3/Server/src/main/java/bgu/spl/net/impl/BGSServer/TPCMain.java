package bgu.spl.net.impl.BGSServer;
import bgu.spl.net.api.bidi.BGSProtocol;
import bgu.spl.net.api.bidi.BidiMessagingProtocol;
import bgu.spl.net.impl.rci.LineMessageEncoderDecoder;
import bgu.spl.net.impl.rci.ObjectEncoderDecoder;
import bgu.spl.net.srv.BaseServer;
import bgu.spl.net.srv.Server;

import java.util.ArrayList;

public class TPCMain {
    public static void main(String[] args) {
        ArrayList<String> forbiddenWords = new ArrayList();
        forbiddenWords.add("Hi");
        forbiddenWords.add("my");
        forbiddenWords.add("name");
        forbiddenWords.add("is");


        int port = -1;
        if (args.length == 0) {
            System.out.println("please specify port");
        }else{
            port = Integer.parseInt(args[0]);
        }
        Server.threadPerClient(port, ()-> new BGSProtocol(forbiddenWords),
                ()->new LineMessageEncoderDecoder()).serve();



    }
}
