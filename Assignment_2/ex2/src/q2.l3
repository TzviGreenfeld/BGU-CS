

(define make-ok
  (lambda (val)
    (cons "Ok" val)
  )
 )
 

(define make-error
  (lambda (msg)
    (cons "Failure" msg)
  )
 )


(define ok?
  (lambda (res)
    (if (pair? res)
     (equal? (car res) "Ok" )
     (#f)
     )
  )
 )


(define error?
  (lambda (res)
    (if (pair? res)
     (equal? (car res) "Failure" )
     (#f)
     )
  )
 )


(define result?
  (lambda (res)
    (or (ok? res) (error? res))
  )
 )


(define result->val
  (lambda (res)
     (cdr res)
  )
)


(define bind 
  (lambda (f)
    (lambda (res)
    (if (ok? res)
      (f (cdr res))
      (make-error (cdr res)))
    )
  )
)


(define make-dict
  (lambda ()
    (list ())
  )
)


(define dict?
  (lambda (e)
    (if (empty? e) 
      #t                        
      (if (pair? e)             
          (if (pair? (car e))
            (dict? (cdr e))     
            #f                  
          )
        #f                      
      )
  )
)


(define get
  (lambda (dict k)
    (if (dict? dict)
      (if (empty? dict)
        (make-error "empty dictionary")
        (if (equal? (car (car dict)) k) 
          (make-ok (cdr (car dict))) 
          (get (cdr dict) k) 
        )
      )
      make-error(("not dictionary")
    )
  )
)


(define put
  (lambda (dict k v)
    (let 
      (toAdd (cons k v))
    )
    (if (dict? dict)
      (if (empty? dict)
        (make-ok (cons toAdd make-dict)) 
        (if (error? (get (dict k))) 
        (make-error )
        )
        (make-ok (cons toAdd (cdr dict))) 
      )
      (make-error("not dictionary"))                       
    )
  )
)


(define map-dict
  (lambda (dict f)
    @TODO
  )
)

(define filter-dict
  (lambda (dict pred)
    @TODO
  )
)
