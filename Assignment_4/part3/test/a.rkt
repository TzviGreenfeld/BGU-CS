(L51
	(define-type Shape
		(circle (radius : number))
		(rectangle (width : number) (height : number)))
	(define-type UD
		(R1 (r11 : number) (r12 : boolean))
		(R2 (r21 : number)))
	(define (s : Shape) (make-circle 1))
)

(L51 
	(define-type Shape
		(circle (radius : number))
		(rectangle (width : number)
				(height : number)))
	(define (s : circle) (make-circle 1))
	(define (f : (Shape -> Shape))
		(lambda ((s : Shape)) : Shape
			(type-case Shape s
				(circle (r) s)
				(rectangle (w h) s))))
	(f s)
)

