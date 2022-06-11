#! /usr/bin/awk -f
    

function printArgs() {
	for (i = 0; i < ARGC; i++){

		printf ("ARGV[%d] = %s\n", i, ARGV[i]);
	}
}

function printNameAgeYear() {
	OFS = " | "
	# <Actor Name > | <Age> | < Year>
	print  $4, $3, $2;
}

function printNameAndMovieAfterYear(year) {
	# Actor Name: <Actor Name>
	# Movie Name: <Movie Name>
	OFS = ": ";
	if ( $2 >= year ) {
		print "Actor Name", $4;
		print "Movie Name", $1;
		print "----------------------------";
	}	
}

function printMovieIndexBetween(start, end) {
	# <Movie Name>
	if ( start <= $1 && $1 <= end ) {
		print $5;
	}	
		# print "----------------------------";
}

BEGIN{
	FS = ",";
	# printArgs();
	

}

# oscar_age_male.csv
# 	1	 2	  3		  4			5	
# Index,Year,Age,Actor Name,Movie Name.

{
	if ($0 !~ /Name/){
		# printNameAgeYear();
		# printNameAndMovieAfterYear(1970);
		printMovieIndexBetween(50,70);
	}
}

END{
	
}
	