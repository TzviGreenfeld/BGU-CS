#! /usr/bin/awk -f

#   1       2           3           4
# index, first col, sencond col, third col


function printIfContainsSpring() {
    OFS = " - - - ";
    if ( $0 ~ /spring/ ) {
        print $2, $3, $4;
    }
    
}

function countFunFan() {
    OFS = " : "
    # if ( $0 ~ /f[u,a]n/ ) {
    if ( $0 ~ /(,| )(f[u,a]n)(\n| )/ ) {
        funFan++;
    }
}

function printIfFirstContainsHappy() {
    OFS = " - - - ";
    if ( $2 ~ /happy/ ) {
        print $2, $3, $4;
    }
    
}

function printIfThreeWords() {
    FS = ",";
    
    if (gsub(/ /, " ", $2) == 2){
        print $2;
        count++;
    }
}


BEGIN {
    FS = ",";
    
}

{
    # printIfContainsSpring();
<<<<<<< HEAD
    # countFunFan();
    # printIfFirstContainsHappy();
    printIfThreeWords();
}

END{
    print "The number of lines where first part has 3 words is", count;
    # print "The number of poem that have fun or fan is", funFan;
=======
    countFunFan();
    # printIfFirstContainsHappy();
}

END{
     print "The number of poem that have fun or fan is", funFan;
>>>>>>> 2c105ba5d3857cf72948d44fe6b27c38b5b6dfb5
}