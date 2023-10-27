#! /usr/bin/awk -f

#    1       2               3                         4           5                   6           7           8
# gender,race/ethnicity,parental level of education,lunch,test preparation course,math score,reading score,writing score

BEGIN{
    FS = ",";
    print "========";
    print "Success Student List:";
    print "========";
}

{
    # if he got 80 in each one of the scores.
    if ($5 >= 80 && $6 >= 80 && $7 >= 80 && $8 >= 80)
    {
        if( $0 !~ /race/){
            print $0;
            cnt++;
        }
    }

}

END{
    print "The number of students: " cnt - 1;
}