#! /usr/bin/awk -f

#    1       2               3                         4           5                   6           7           8
# gender,race/ethnicity,parental level of education,lunch,test preparation course,math score,reading score,writing score

function calcAvgs() {

    if ($4 == "standard" ) {
        math += $6;
        reading += $7;
        writing += $8;
        n++;
    }
}

function countParentBchelors() {
    if ($3 == "bachelor's degree") {
        pConuter++;
    }
}
    


BEGIN{
    FS = ",";
}

{
    # calcAvgs();
    countParentBchelors();
}

END{
    # print avereges for math, reading, writing
    # if (n != 0) {
    #     print "math: " math / n;
    #     print "reading: " reading / n;
    #     print "writing: " writing / n;
    # }

    print "number of students whose parents have bachelor's degree: " pConuter;
}