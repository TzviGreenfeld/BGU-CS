#lang racket

(provide (all-defined-out))

(define id (lambda (x) x))
(define cons-lzl cons)
(define empty-lzl? empty?)
(define empty-lzl '())
(define head car)
(define tail
  (lambda (lzl)
    ((cdr lzl))))

;;; Q1.a
; Signature: compose(f g)
; Type: [T1 -> T2] * [T2 -> T3]  -> [T1->T3]
; Purpose: given two unary functions return their composition, in the same order left to right
; test: ((compose - sqrt) 16) ==> -4
;       ((compose not not) true)==> true
(define compose
  (lambda (f g)
    (lambda (x)
       (g (f x)))))


; Signature: pipe(lst-fun)
; Type: [[T1 -> T2],[T2 -> T3]...[Tn-1 -> Tn]]  -> [T1->Tn]
; Purpose: Returns the composition of a given list of unary functions. For (pipe (list f1 f2 ... fn)), returns the composition fn(....(f1(x)))
; test: ((pipe (list sqrt - - number?)) 16)) ==> true
;       ((pipe (list sqrt - - number? not)) 16) ==> false
;       ((pipe (list sqrt add1 - )) 100) ==> -11
(define pipe
  (lambda (fs)  
    (if (empty? (cdr fs))
        (car fs)
        (compose (car fs) (pipe (cdr fs))))))

; Signature: pipe$(lst-fun,cont)
;         [T1 * [T2->T3] ] -> T3,
;         [T3 * [T4 -> T5] ] -> T5,
;         ...,
;         [T2n-1 * [T2n * T2n+1]] -> T2n+1
;        ]
;        *
;       [[T1 * [T2n -> T2n+1]] -> T2n+1] -> 
;              [[T1 * [T2n+1 -> T2n+2]] -> T2n+2]
;      -> [T1 * [T2n+3 -> T2n+4]] -> T2n+4
; Purpose: Returns the composition of a given list of unry CPS functions. 
;;; (define compose
;;;   (lambda (f g)
;;;     (lambda (x)
;;;        (g (f x)))))


(define compose$
  (lambda (f g cont)
    (cont (lambda (x c)
        (f x (lambda (f-res) (g f-res c)))))))


(define pipe$  
  (lambda (fs cont)  
      (if (empty? (cdr fs))
          (cont (car fs))
          (pipe$ (cdr fs) (lambda (pipe-res)  (compose$ (car fs) pipe-res cont)))
           )))


;;; (require racket/trace)
;;; (trace compose$)
;;; (trace pipe$)

;;; Q1.c

; Signature: reduce-prim$(reducer, init, lst, cont)
; Type: @TODO
; Purpose: Returns the reduced value of the given list, from left 
;          to right, with cont post-processing
; Pre-condition: reducer is primitive
; test: (reduce-prim$ + 0 '( 8 2 2) (lambda (x) x))==> 15
;      (reduce-prim$ * 1 '(1 2 3 4 5) (lambda (x) x)) ==> 120
;      (reduce-prim$ - 1 '(1 2 3 4 5) (lambda (x) x))==> -14

(define reduce-prim$ 
(lambda(reducer acc lst cont)
 (if (empty? lst)
    (cont acc)
    (reduce-prim$ reducer acc (cdr lst) 
      (lambda (reduce-result)
        (cont (reducer reduce-result (car lst)))
        )))))
 

; Signature: reduce-user$(reducer, init, lst, cont)
; Type: @TODO
; Purpose: Returns the reduced value of the given list, from left 
;          to right, with cont post-processing
; Pre-condition: reducer is a CPS user prococedure
; test: (reduce-user$ plus$ 0 '(3 8 2 2) (lambda (x) x)) ==> 15
;        (reduce-user$ div$ 100 '(5 4 1) (lambda (x) (* x 2))) ==> -14

(define reduce-user$
  (lambda (reducer$ acc lst cont)
    (if (empty? lst)
      (cont acc)
      (reducer$ acc (car lst) (lambda (op-res) 
        (reduce-user$ reducer$ op-res (cdr lst) cont)
        )
      )      
    )
  )
)
 (require racket/trace)
 (trace reduce-user$)

;;; Q2.c.1
; Signature: take1(lz-lst,pred)
; Type: [LzL<T>*[T -> boolean] -> List<T>]
; Purpose: while pred holds return the list elments
; Tests: (take-while (integers-from 0) (lambda (x) (< x 9)))==>'(0 1 2 3 4 5 6 7 8)
;          (take-while(integers-from 0) (lambda (x)  (= x 128))))==>'()
(define take-while
  (lambda (lz-lst pred)
    (if (or (not (pred (head lz-lst))) (empty-lzl? lz-lst))
      empty-lzl
      (cons (head lz-lst)
            (take-while (tail lz-lst) pred)))))


;;; Q2.c.2
; Signature: take-while-lzl(lz-lst,pred)
; Type: [LzL<T>*[T -> boolean] -> Lzl<T>]
; Purpose: while pred holds return list elments as a lazy list
; Tests: (take (take-while-lzl (integers-from 0) (lambda (x) (< x 9))) 10) ==>'(0 1 2 3 4 5 6 7 8)
;           (take-while-lzl(integers-from 0) (lambda (x)  (= x 128))))==>'()
(define take-while-lzl
  (lambda (lz-lst pred)
    (if (or (not (pred (head lz-lst))) (empty-lzl? lz-lst))
      empty-lzl
      (cons (head lz-lst)
            (lambda()
            (if (pred (head (tail lz-lst)))
              (take-while-lzl (tail lz-lst) pred)
              empty-lzl
            ))))))


;;; Q2.d
; Signature: reduce-lzl(reducer, init, lzl)
; Type: @TODO
; Purpose: Returns the reduced value of the given lazy list
(define reduce-lzl 
  (lambda (reducer acc lzl)
     (if  (empty-lzl? lzl)
     acc
     (reduce-lzl reducer (reducer acc (head lzl)) (tail lzl))
     )
  )
)



