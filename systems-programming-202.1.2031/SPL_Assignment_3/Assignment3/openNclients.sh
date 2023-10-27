#!/bin/bash

cd Client/
make clean
make
for((i=0;i<$1;i++));do gnome-terminal -- bash -c "./bin/echoExample 127.0.0.1 8888; exec bash";done;
~                                 
