section .data
    msg: db "Hello, Infected File" ,10 ,0

section .text
global _start
global system_call
global code_start
global infection
global infector
global code_end

extern main
_start:
    pop    dword ecx    ; ecx = argc
    mov    esi,esp      ; esi = argv
    ;; lea eax, [esi+4*ecx+4] ; eax = envp = (4*ecx)+esi+4
    mov     eax,ecx     ; put the number of arguments into eax
    shl     eax,2       ; compute the size of argv in bytes
    add     eax,esi     ; add the size to the address of argv 
    add     eax,4       ; skip NULL at the end of argv
    push    dword eax   ; char *envp[]
    push    dword esi   ; char* argv[]
    push    dword ecx   ; int argc

    call    main        ; int main( int argc, char *argv[], char *envp[] )

    mov     ebx,eax
    mov     eax,1
    int     0x80
    nop

system_call:
    push    ebp             ; Save caller state
    mov     ebp, esp
    sub     esp, 4          ; Leave space for local var on stack
    pushad                  ; Save some more caller state

    mov     eax, [ebp+8]    ; Copy function args to registers: leftmost...        
    mov     ebx, [ebp+12]   ; Next argument...
    mov     ecx, [ebp+16]   ; Next argument...
    mov     edx, [ebp+20]   ; Next argument...
    int     0x80            ; Transfer control to operating system
    mov     [ebp-4], eax    ; Save returned value...
    popad                   ; Restore caller state (registers)
    mov     eax, [ebp-4]    ; place returned value where caller can see it
    add     esp, 4          ; Restore caller state
    pop     ebp             ; Restore caller state
    ret                     ; Back to caller

code_start:

infection:
    push    ebp             ; Save caller state
    mov     ebp, esp
    pushad                  ; Save some more caller state
    
    mov eax, [ebp+8]
    mov ebp, eax
    and eax, 1              ; isOdd
    jnz exit                 ; is nonZero
    jmp even
    
    
even:
    mov eax, 4              ; move syscall write opcode to eax- arg 1
    mov ebx, 1              ; move stdout fd to ebx - arg 2
    mov ecx, msg            ; move msg to ecx - arg 3
    mov edx, 22             ; move the length of msg to edx- arg4
    int     0x80           ; Transfer control to operating system
    sub ebp, 1
    jnz even

exit:                        ; do nothing
    popad                   ; Restore caller state (registers)
    mov esp, ebp
    pop     ebp             ; Restore caller state
    ret  

infector:
    push    ebp             
    mov     ebp, esp
    sub     esp, 4          
    pushad                  

    mov eax, 5              
    mov ebx, dword [ebp+8]  
    mov ecx, 0x441               
    mov edx, 0777           
    int 0x80                

    mov ebx, eax            
    mov [ebp-4], eax        
    mov eax, 4
    mov ecx, code_start     
    mov edx, code_end
    sub edx, code_start     
    int 0x80                

    mov eax, 6              
    mov ebx, dword[ebp-4]   
    int 0x80                

    popad                   
    mov esp, ebp
    pop     ebp             
    ret                     

code_end:



