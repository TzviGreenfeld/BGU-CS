#! /usr/bin/awk -f


# $2 ~ /.?a.?/{ print $2 " " $4 }
# { print $1 " " $4 " " $3 " " $2 }

# BEGIN{
# 	cnt = 0;
# }
# {
# 	if($3 ~ /English/){
# 		cnt++;
# 	}
# }

# END{
# 	{ print "Count = " cnt }
# }
	
BEGIN{
	
}
{
	if($4 > 87){
		{print $0}
	}
}

END{
	
}
	



