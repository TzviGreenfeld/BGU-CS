#!/bin/bash

cd Server/
mvn clean
mvn package

./../openNclients.sh $1

slep 3
mvn exec:java -Dexec.mainClass="bgu.spl.net.impl.BGSServer.TPCMain" -Dexec.args="8888"
