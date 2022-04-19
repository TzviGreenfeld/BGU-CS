import os
import sys

COMMENT =  ";;"

def isComment(line: str):
    return (not line.startswith(COMMENT))

def main(args):
    out_f = args[2]
    filtered = []
    with open(args[1], "r") as racket_file:
        lines = racket_file.readlines()
        for line in filter(isComment, lines):
            if COMMENT in line:
                filtered.append(line[:line.rfind(COMMENT)] + "\n")
            else:
                filtered.append(line)
        
        print(filtered)
        filtered = ''.join(list(filtered)) 
        print (filtered)
        
        with open(out_f, "w") as out:
            out.write(''.join(filtered))
    

if __name__ == '__main__':
    main(sys.argv)
