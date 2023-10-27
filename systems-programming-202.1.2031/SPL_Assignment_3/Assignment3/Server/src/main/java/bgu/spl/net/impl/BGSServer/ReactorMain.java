package bgu.spl.net.impl.BGSServer;

import bgu.spl.net.api.bidi.BGSProtocol;
import bgu.spl.net.impl.rci.LineMessageEncoderDecoder;
import bgu.spl.net.srv.Reactor;
import bgu.spl.net.srv.Server;

import java.util.ArrayList;

public class ReactorMain {
    public static void main(String[] args) {
        ArrayList<String> forbiddenWords = new ArrayList();
        forbiddenWords.add("Hi");
        forbiddenWords.add("my");
        forbiddenWords.add("name");
        forbiddenWords.add("is");


        if (args.length < 2){
            System.out.println("Please specify port AND number of threads");
            return;
        }
            int nThread = Integer.parseInt(args[1]);
            int port = Integer.parseInt(args[0]);

        new Reactor(nThread, port,
                () -> new BGSProtocol(forbiddenWords),
                ()-> new LineMessageEncoderDecoder()).serve();




    }
}
