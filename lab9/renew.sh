for dir in */*/ 
    do for f in "ELFexec" "ELFexec2short" 
        do cp "$f" "$dir/$f"
    done
done