#lang racket
(require rackunit)
(require math/base)
(require "ex5.rkt")

(define id (lambda (x) x))
(define plus$
 (lambda (x y cont) (cont (+ x y))))
(define div$
  (lambda (x y cont) (cont (/ x y))))
(define square$
  (lambda (x cont) (cont(* x x))))
(define add1$
  (lambda (x cont) (cont(+ x 1))))
(define div2$
  (lambda (x cont) (cont(/ x 2))))
(define g-0$
  (lambda (n cont)
    (cont (if (> n 0) #t #f))))
(define bool-num$
  (lambda (b cont)
    (cont (if b 1 0))))
(define take
  (lambda (lz-lst n)
    (if (or (= n 0) (empty-lzl? lz-lst))
      empty-lzl
      (cons (head lz-lst)
                 (take (tail lz-lst) (- n 1))))))
(define integers-from
  (lambda (n)
    (cons-lzl n (lambda () (integers-from (+ n 1))))))

;; Q1a
(check-equal? ((pipe (list sqrt - - even? not))16) #f "incorrect pipe test1")
(check-equal? ((pipe (list add1 add1 sqrt - -)) 14) 4 "incorrect pipe test12")
(check-equal? ((pipe (list sqrt add1 - )) 100)  -11 "incorrect pipe test3")


;; Q1b
(check-equal? ((pipe$ (list add1$ square$ div2$) id) 3 id)  8 "incorrect pipe$ test1")
(check-equal? ((pipe$ (list square$ add1$ div2$) id) 3 id)  5 "incorrect pipe$ test2")
(check-equal? ((pipe$ (list add1$ square$ div2$) (lambda (f$) (id (lambda (x cont) (f$ x (lambda (res) (add1$ res cont))))))) 3 id)  9 "incorrect pipe$ test3")
(check-equal? ((pipe$ (list square$ add1$ div2$) id) 3 (lambda (x) (* x 10)))  50 "incorrect pipe$ test4")
(check-equal? ((pipe$ (list square$ add1$ div2$) (lambda (f$) (id (lambda (x cont) (f$ x (lambda (res) (add1$ res cont))))))) 3 (lambda (x) (* x 10)))  60 "incorrect pipe$ test5")
(check-equal? ((pipe$ (list g-0$ bool-num$) id) 3 id)  1 "incorrect pipe$ test1")

;; Q1c
(check-equal? (reduce-prim$ + 0 '(3 8 2 2) id) 15 "incorrect reduce-prim$ test1")
(check-equal? (reduce-prim$ * 1 '(1 2 3 4 5) id) 120 "incorrect reduce-prim$ test2")
(check-equal? (reduce-prim$ - 1 '(1 2 3 4 5) id) -14 "incorrect reduce-prim$ test3")
(check-equal? (reduce-prim$ / 400 '(2 4 5 2) id) 5 "incorrect reduce-prim$ test4")
(check-equal? (reduce-user$ plus$ 0 '(3 8 2 2) (lambda (x) x)) 15 "incorrect reduce-user$ test1")
(check-equal? (reduce-user$ div$ 100 '(5 4 1) (lambda (x) (* x 2))) 10 "incorrect reduce-user$ test2")



;; Q2.c
(check-equal? (take-while (integers-from 0) (lambda (x) (< x 9))) '(0 1 2 3 4 5 6 7 8) "incorrect take-while test1")
(check-equal? (take-while (integers-from 0) (lambda (x) (= x 128))) '() "incorrect take-while test2")
(check-equal? (take-while (integers-from 0) (lambda (x) (and (>= x 0) (< x 15)))) '(0 1 2 3 4 5 6 7 8 9 10 11 12 13 14) "incorrect take-while test3")
(check-equal? (take (take-while-lzl (integers-from 0) (lambda (x) (< x 9))) 10) '(0 1 2 3 4 5 6 7 8) "incorrect take-while-lzl test4")
(check-equal? (take-while-lzl (integers-from 0) (lambda (x) (= x 128))) '() "incorrect take-while-lzl test5")


;; Q2.d
(check-equal? (reduce-lzl + 0 (cons 3 (lambda () (cons 8 (lambda () '()))))) 11 "incorrect reduce-lzl test1")
(check-equal? (reduce-lzl / 6 (cons 3 (lambda () (cons 2 (lambda () '()))))) 1 "incorrect reduce-lzl test2")
(check-equal? (reduce-lzl + 0 (cons 3 (lambda () (cons 2 (lambda () '()))))) 5 "incorrect reduce2-lzl test3")



