# SPL_Assignment_3

Execution:

1.Server:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
cd Server
mvn package

//for Thread-per-clent server:
mvn exec:java -Dexec.mainClass="bgu.spl.net.impl.BGSServer.TPCMain" -Dexec.args="<port>"

//for Reactor server:
mvn exec:java -Dexec.mainClass="bgu.spl.net.impl.BGSServer.ReactorMain" -Dexec.args="<port> <number of threads>"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

2.Client:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
cd Client
make
./bin/echoExample <ip> <port>

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Messegas exapmles:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
REGISTER:
REGISTER A 123 11-10-2000

LOGIN:
LOGIN A 123 1

LOGOUT:
LOGOUT

FOLLOW/UNFOLLOW:
FOLLOW 0 A
FOLLOW 1 A

POST:
POST HELLOW WORLD

PM:
PM A HOW ARE YOU?

LOGSTAT:
LOGSTAT

STAT:
STAT A
STAT A|B

BLOCK:
BLOCK A

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
the filtered set of words is in ReactorMain/TPCMain in an ArrayList called forbiddenWords
