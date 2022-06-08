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
    if ( $0 ~ / f[u,a]n / ) {
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
    # countFunFan();
    # printIfFirstContainsHappy();
    printIfThreeWords();
}

END{
    print "The number of lines where first part has 3 words is", count;
    # print "The number of poem that have fun or fan is", funFan;
}