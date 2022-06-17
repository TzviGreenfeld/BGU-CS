cat ELFexec2 > ELFexec2short
chmod 777 ELFexec2short
make
./ELFexec2short
./printentry ELFexec2short
echo virus runs
./virus
echo program runs
./printentry ELFexec2short
cat ELFexec2short > ELFexec2short1
chmod 777 ELFexec2short1
cat ELFexec2 > ELFexec2short
chmod 777 ELFexec2short
./ELFexec2short1