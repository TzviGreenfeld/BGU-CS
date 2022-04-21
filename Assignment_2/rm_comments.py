import os
import sys

'''
pytyhon3 rm_comment.py $inputFile $outputFile
'''

COMMENT =  ";;"

def remove_comments(in_fileName, out_fileName):
    filtered = ""
    with open(in_fileName, "r") as in_f:
        lines = in_f.readlines()
        for line in lines:
            if COMMENT in line:
                filtered += (line[:line.rfind(COMMENT)] + "\n")
            else:
                filtered += line
        
        with open(out_fileName, "w") as out_f:
            out_f.write(filtered)
    

if __name__ == '__main__':
    remove_comments(sys.argv[1], sys.argv[2])
