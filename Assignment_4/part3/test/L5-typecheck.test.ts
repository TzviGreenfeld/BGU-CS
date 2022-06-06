import { isTypedArray } from 'util/types';
import { isProgram, parseL51, Program } from '../src/L5/L5-ast';
import { typeofProgram, L51typeof, initTEnv, getRecords, getTypeDefinitions,
         checkEqualType, getParentsType, coverTypes, checkCoverType, getUserDefinedTypeByName, mostSpecificType } from '../src/L5/L5-typecheck';
import { applyTEnv } from '../src/L5/TEnv';
import { isNumTExp, isProcTExp, makeBoolTExp, makeNumTExp, makeProcTExp, makeTVar, 
         makeVoidTExp, parseTE, unparseTExp, TExp, makeUserDefinedNameTExp, 
         isUserDefinedTExp, isUserDefinedNameTExp, makeAnyTExp, isAnyTExp, UserDefinedTExp, isTExp } from '../src/L5/TExp';
import { makeOk, isOkT, bind, mapv, isFailure, Result } from '../src/shared/result';

describe('L5 Type Checker', () => {
    describe('parseTE', () => {
        it('parses atoms', () => {
            expect(parseTE("number")).toEqual(makeOk(makeNumTExp()));
            expect(parseTE("boolean")).toEqual(makeOk(makeBoolTExp()));
        });

        it('parses type variables', () => {
            expect(parseTE("T1")).toEqual(makeOk(makeTVar("T1")));
        });

        it('parses procedures', () => {
            expect(parseTE("(number -> (number -> number))")).toEqual(
                makeOk(makeProcTExp([makeNumTExp()], makeProcTExp([makeNumTExp()], makeNumTExp())))
            );
        });

        it('parses "void" and "Empty"', () => {
            expect(parseTE("void")).toEqual(makeOk(makeVoidTExp()));
            expect(parseTE("(Empty -> void)")).toEqual(makeOk(makeProcTExp([], makeVoidTExp())));
        });
    });

    describe('unparseTExp', () => {
        it('unparses atoms', () => {
            expect(unparseTExp(makeNumTExp())).toEqual(makeOk("number"));
            expect(unparseTExp(makeBoolTExp())).toEqual(makeOk("boolean"));
        });

        it('unparses type variables', () => {
            expect(unparseTExp(makeTVar("T1"))).toEqual(makeOk("T1"));
        });

        it('unparses procedures', () => {
            expect(unparseTExp(makeProcTExp([makeTVar("T"), makeTVar("T")], makeBoolTExp()))).toEqual(makeOk("(T * T -> boolean)"));
            expect(unparseTExp(makeProcTExp([makeNumTExp()], makeProcTExp([makeNumTExp()], makeNumTExp())))).toEqual(makeOk("(number -> (number -> number))"));
        });
    });

    describe('L51typeof', () => {
        it('returns the types of atoms', () => {
            expect(L51typeof("5")).toEqual(makeOk("number"));
            expect(L51typeof("#t")).toEqual(makeOk("boolean"));
        });

        it('returns the type of primitive procedures', () => {
            expect(L51typeof("+")).toEqual(makeOk("(number * number -> number)"));
            expect(L51typeof("-")).toEqual(makeOk("(number * number -> number)"));
            expect(L51typeof("*")).toEqual(makeOk("(number * number -> number)"));
            expect(L51typeof("/")).toEqual(makeOk("(number * number -> number)"));
            expect(L51typeof("=")).toEqual(makeOk("(number * number -> boolean)"));
            expect(L51typeof("<")).toEqual(makeOk("(number * number -> boolean)"));
            expect(L51typeof(">")).toEqual(makeOk("(number * number -> boolean)"));
            expect(L51typeof("not")).toEqual(makeOk("(boolean -> boolean)"));
        });

        it("returns the type of primitive op applications", () => {
            expect(L51typeof("(+ 1 2)")).toEqual(makeOk("number"));
            expect(L51typeof("(- 1 2)")).toEqual(makeOk("number"));
            expect(L51typeof("(* 1 2)")).toEqual(makeOk("number"));
            expect(L51typeof("(/ 1 2)")).toEqual(makeOk("number"));

            expect(L51typeof("(= 1 2)")).toEqual(makeOk("boolean"));
            expect(L51typeof("(< 1 2)")).toEqual(makeOk("boolean"));
            expect(L51typeof("(> 1 2)")).toEqual(makeOk("boolean"));

            expect(L51typeof("(not (< 1 2))")).toEqual(makeOk("boolean"));
        });

        it.skip('type checking of generic functions is not supported', () => {
            // All of these fail in TypeCheck because we do not support generic functions
            // They do work in Type Inference.
            expect(L51typeof("(eq? 1 2)")).toEqual(makeOk("boolean"));
            expect(L51typeof('(string=? "a" "b")')).toEqual(makeOk("boolean"));
            expect(L51typeof('(number? 1)')).toEqual(makeOk("boolean"));
            expect(L51typeof('(boolean? "a")')).toEqual(makeOk("boolean"));
            expect(L51typeof('(string? "a")')).toEqual(makeOk("boolean"));
            expect(L51typeof('(symbol? "a")')).toEqual(makeOk("boolean"));
            expect(L51typeof('(list? "a")')).toEqual(makeOk("boolean"));
            expect(L51typeof('(pair? "a")')).toEqual(makeOk("boolean"));
        });

        it('returns the type of "if" expressions', () => {
            expect(L51typeof("(if (> 1 2) 1 2)")).toEqual(makeOk("number"));
            expect(L51typeof("(if (= 1 2) #t #f)")).toEqual(makeOk("boolean"));
        });

        it('returns the type of procedures', () => {
            expect(L51typeof("(lambda ((x : number)) : number x)")).toEqual(makeOk("(number -> number)"));
            expect(L51typeof("(lambda ((x : number)) : boolean (> x 1))")).toEqual(makeOk("(number -> boolean)"));
            expect(L51typeof("(lambda((x : number)) : (number -> number) (lambda((y : number)) : number (* y x)))")).toEqual(makeOk("(number -> (number -> number))"));
            expect(L51typeof("(lambda((f : (number -> number))) : number (f 2))")).toEqual(makeOk("((number -> number) -> number)"));
            expect(L51typeof("(lambda((x : number)) : number (let (((y : number) x)) (+ x y)))")).toEqual(makeOk("(number -> number)"));
        });

        it('returns the type of "let" expressions', () => {
            expect(L51typeof("(let (((x : number) 1)) (* x 2))")).toEqual(makeOk("number"));
            expect(L51typeof("(let (((x : number) 1) ((y : number) 3)) (+ x y))")).toEqual(makeOk("number"));
            expect(L51typeof("(let (((x : number) 1) ((y : number) 2)) (lambda((a : number)) : number (+ (* x a) y)))")).toEqual(makeOk("(number -> number)"));
        });

        it('returns the type of "letrec" expressions', () => {
            expect(L51typeof("(letrec (((p1 : (number -> number)) (lambda((x : number)) : number (* x x)))) p1)")).toEqual(makeOk("(number -> number)"));
            expect(L51typeof("(letrec (((p1 : (number -> number)) (lambda((x : number)) : number (* x x)))) (p1 2))")).toEqual(makeOk("number"));
            expect(L51typeof(`
                (letrec (((odd? : (number -> boolean)) (lambda((n : number)) : boolean (if (= n 0) #f (even? (- n 1)))))
                         ((even? : (number -> boolean)) (lambda((n : number)) : boolean (if (= n 0) #t (odd? (- n 1))))))
                  (odd? 12))`)).toEqual(makeOk("boolean"));
        });

        it('returns "void" as the type of "define" expressions', () => {
            expect(L51typeof("(define (foo : number) 5)")).toEqual(makeOk("void"));
            expect(L51typeof("(define (foo : (number * number -> number)) (lambda((x : number) (y : number)) : number (+ x y)))")).toEqual(makeOk("void"));
            expect(L51typeof("(define (x : (Empty -> number)) (lambda () : number 1))")).toEqual(makeOk("void"));
        });

        it.skip('returns "literal" as the type for literal expressions', () => {
            expect(L51typeof("(quote ())")).toEqual(makeOk("literal"));
        });
	});

    describe('Tools for analysis of UD Types', () => {
		const p = `(L51
            (define-type Shape
                (circle (radius : number))
                (rectangle (width : number) (height : number)))
            (define-type UD
                (R1 (r11 : number) (r12 : boolean))
                (R2 (r21 : number)))
            (define (s : Shape) (make-circle 1))
        )`;
        const pp = parseL51(p);
        // R1 and R2 are subtypes of UD
        // circle and rectangle are subtypes of Shape           
        const UD = makeUserDefinedNameTExp('UD');
        const R1 = makeUserDefinedNameTExp('R1');
        const R2 = makeUserDefinedNameTExp('R2');

        const Shape = makeUserDefinedNameTExp('Shape');
        const circle = makeUserDefinedNameTExp('circle');

        it('Parses the program', () => {
            expect(pp).toSatisfy(isOkT(isProgram));
        });

		// console.log(`${JSON.stringify(pp, null, 2)}`);				
		it('Collects ud types and records', () => {
			mapv(pp, (p: Program) => {
				const records = getRecords(p);
				const udtypes = getTypeDefinitions(p);
                expect(records.length).toBe(4);
                expect(udtypes.length).toBe(2);
			});
		});
		
        it('checkEqualType knows about any and subtypes across records and UD types', () => {
            mapv(pp, (p: Program) => {
                const c1 = checkEqualType(R1, UD, p.exps[2], p);
                expect(c1).toSatisfy(isOkT(isUserDefinedNameTExp));
                mapv(c1, (ud) => expect(ud).toStrictEqual(UD));

                const c2 = checkEqualType(R2, UD, p.exps[2], p);
                expect(c2).toSatisfy(isOkT(isUserDefinedNameTExp));
                mapv(c2, (ud) => expect(ud).toStrictEqual(UD));

                const c3 = checkEqualType(R1, Shape, p.exps[2], p);
                expect(c3).toSatisfy(isFailure);

                const c4 = checkEqualType(circle, Shape, p.exps[2], p);
                expect(c4).toSatisfy(isOkT(isUserDefinedNameTExp));
                mapv(c4, (ud) => expect(ud).toStrictEqual(Shape));

                const c5 = checkEqualType(makeNumTExp(), Shape, p.exps[2], p);
                expect(c5).toSatisfy(isFailure);

                const c6 = checkEqualType(R1, makeAnyTExp(), p.exps[2], p);
                expect(c6).toSatisfy(isOkT(isAnyTExp));

                const c7 = checkEqualType(makeNumTExp(), makeAnyTExp(), p.exps[2], p);
                expect(c7).toSatisfy(isOkT(isAnyTExp));

                const c8 = checkEqualType(makeAnyTExp(), makeNumTExp(), p.exps[2], p);
                expect(c8).toSatisfy(isFailure);
            });
        });

        it('getParentsType knows about subtypes across records and UD types', () => {
            mapv(pp, (p: Program) => {
                const p1 : TExp[] = getParentsType(R1, p);
                expect(p1).toStrictEqual([R1, UD]);

                const p2 : TExp[] = getParentsType(R2, p);
                expect(p2).toStrictEqual([R2, UD]);

                const p3 : TExp[] = getParentsType(makeNumTExp(), p);
                expect(p3).toStrictEqual([makeNumTExp()]);

                const UDD = getUserDefinedTypeByName(UD.typeName, p);
                mapv(UDD, (udd: UserDefinedTExp) => {
                    const p4 : TExp[] = getParentsType(udd, p);
                    expect(p4).toStrictEqual([udd]);

                    const rec1 = udd.records[0];
                    const p5 = getParentsType(rec1, p);
                    expect(p5).toStrictEqual([R1, UD]);
                });
            });
        });

        it('computes mostSpecificType with ID types', () => {
            mapv(pp, (p: Program) => {
                const mst1 : TExp = mostSpecificType([R1, R1], p);
                expect(mst1).toStrictEqual(R1);

                const mst2 : TExp = mostSpecificType([R1, UD], p);
                expect(mst2).toStrictEqual(R1);

                const mst3 : TExp = mostSpecificType([UD, UD], p);
                expect(mst3).toStrictEqual(UD);
            });
        });
        
        it('compute coverTypes with type names', () => {
            mapv(pp, (p: Program) => {
                const ct1 : TExp[] = coverTypes([R1, R2], p);
                expect(ct1).toStrictEqual([UD]);

                const ct2 = coverTypes([R1, circle], p);
                expect(ct2).toStrictEqual([]);

                const ct4 = coverTypes([makeNumTExp(), makeNumTExp()], p);
                expect(ct4).toStrictEqual([makeNumTExp()]);

                const ct5 = coverTypes([R1, R1, R2], p);
                expect(ct5).toStrictEqual([UD]);

                const ct6 = coverTypes([R1], p);
                expect(ct6).toStrictEqual([R1, UD]);

                const ct3 = coverTypes([R1, R1], p);
                expect(ct3).toStrictEqual([R1, UD]);
            });
        });

        it('compute checkCoverTypes with type names', () => {
            mapv(pp, (p: Program) => {
                const ct1: Result<TExp> = checkCoverType([R1, R2], p);
                expect(ct1).toSatisfy(isOkT(isTExp));
                mapv(ct1, (cover: TExp) =>
                    expect(cover).toStrictEqual(UD));

                const ct2: Result<TExp> = checkCoverType([R1, circle], p);
                expect(ct2).toSatisfy(isFailure);

                const ct3: Result<TExp> = checkCoverType([R1, R1], p);
                expect(ct3).toSatisfy(isOkT(isTExp));
                mapv(ct3, (cover: TExp) =>
                    expect(cover).toStrictEqual(R1));

                const ct4: Result<TExp> = checkCoverType([makeNumTExp(), makeNumTExp()], p);
                expect(ct4).toSatisfy(isOkT(isTExp));
                mapv(ct4, (cover: TExp) =>
                    expect(cover).toStrictEqual(makeNumTExp()));

                const ct5: Result<TExp> = checkCoverType([R1, R1, R2], p);
                expect(ct5).toSatisfy(isOkT(isTExp));
                mapv(ct5, (cover: TExp) =>
                    expect(cover).toStrictEqual(UD));

                const ct6: Result<TExp> = checkCoverType([R1], p);
                expect(ct6).toSatisfy(isOkT(isTExp));
                mapv(ct6, (cover: TExp) =>
                    expect(cover).toStrictEqual(R1));
            });
        });

		it('knows about automatically defined type predicates', () => {
			mapv(pp, (p: Program) => {
                const circlepred = applyTEnv(initTEnv(p), "circle?");
				const circleconst = applyTEnv(initTEnv(p), "make-circle");
				const rectpred = applyTEnv(initTEnv(p), "rectangle?");
				const rectconst = applyTEnv(initTEnv(p), "make-rectangle");
				const shapepred = applyTEnv(initTEnv(p), "Shape?");

                expect(circlepred).toSatisfy(isOkT(isProcTExp));
                expect(circleconst).toSatisfy(isOkT(isProcTExp));
                expect(rectpred).toSatisfy(isOkT(isProcTExp));
                expect(rectconst).toSatisfy(isOkT(isProcTExp));
                expect(shapepred).toSatisfy(isOkT(isProcTExp));
			});
		});
    });

    describe('Type analysis of UD Types - Simple return type', () => {
        const tc1 = `
        (L51 
            (define-type Shape
                (circle (radius : number))
                (rectangle (width : number)
                        (height : number)))
            (define (s : circle) (make-circle 1))
            (type-case Shape s
                (circle (r) (* (* r r) 3.14))
                (rectangle (w h) (* w h)))
        )
        `;
        const ptc = parseL51(tc1);
        expect(ptc).toSatisfy(isOkT(isProgram));
        it('analyzes type-case', () => {
            mapv(ptc, (p: Program) => {
                // console.log(`Parsed program ${JSON.stringify(p, null, 2)}`);
                const t = typeofProgram(p, initTEnv(p), p);
                // console.log(`Analyzed type ${JSON.stringify(t, null, 2)}`);
                expect(t).toSatisfy(isOkT(isTExp));
                mapv(t, (t1: TExp) => {
                    expect(t1).toSatisfy(isNumTExp);
                })                
            })
        });
	});

    describe('Type analysis of UD Types - Record return type', () => {
        const circle = makeUserDefinedNameTExp('circle');

        it('analyzes type-case with general coverType', () => {
            const tc1 = `
            (L51 
                (define-type Shape
                    (circle (radius : number))
                    (rectangle (width : number)
                            (height : number)))
                (define (s : circle) (make-circle 1))
                (type-case Shape s
                    (circle (r) s)
                    (rectangle (w h) s))
            )
            `;
            const ptc = parseL51(tc1);
            expect(ptc).toSatisfy(isOkT(isProgram));
            mapv(ptc, (p: Program) => {
                // console.log(`Parsed program ${JSON.stringify(p, null, 2)}`);
                const t = typeofProgram(p, initTEnv(p), p);
                expect(t).toSatisfy(isOkT(isTExp));
                // console.log(`Analyzed type ${JSON.stringify(t, null, 2)}`);
                mapv(t, (t1: TExp) => {
                    expect(t1).toStrictEqual(circle);
                })                
            })
        });
    });

    describe('Type analysis of UD Types - UD return type', () => {
        const Shape = makeUserDefinedNameTExp('Shape');

        it('analyzes type-case with general coverType in a function', () => {
            const tc1 = `
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
            `;
            const ptc = parseL51(tc1);
            expect(ptc).toSatisfy(isOkT(isProgram));
            mapv(ptc, (p: Program) => {
                const t = typeofProgram(p, initTEnv(p), p);
                expect(t).toSatisfy(isOkT(isTExp));
                // console.log(`Analyzed type ${JSON.stringify(t, null, 2)}`);
                mapv(t, (t1: TExp) => {
                    expect(t1).toStrictEqual(Shape);
                })                
            })
        });
    });

    describe('Type analysis of UD Types - UD return type', () => {
        const Shape = makeUserDefinedNameTExp('Shape');
        const circle = makeUserDefinedNameTExp('circle');

        it('analyzes type-case with specific coverType', () => {
            const tc2 = `
            (L51 
                (define-type Shape
                    (circle (radius : number))
                    (rectangle (width : number)
                            (height : number)))
                (define (s : circle) (make-circle 1))
                (type-case Shape s
                    (circle (r) (make-circle (* 2 r)))
                    (rectangle (w h) (make-circle (+ w h))))
            )
            `;
            const ptc = parseL51(tc2);
            expect(ptc).toSatisfy(isOkT(isProgram));
            mapv(ptc, (p: Program) => {
                const t = typeofProgram(p, initTEnv(p), p);
                // console.log(`Analyzed type ${JSON.stringify(t, null, 2)}`);
                expect(t).toSatisfy(isOkT(isTExp));
                mapv(t, (t1: TExp) => {
                    expect(t1).toStrictEqual(circle);
                });
            });
        });

        it('analyzes type-case with a record parameter in val position', () => {
            const tc2 = `
            (L51 
                (define-type Shape
                    (circle (radius : number))
                    (rectangle (width : number)
                            (height : number)))
                (define (s : circle) (make-circle 1))
                (type-case circle s
                    (circle (r) (make-rectangle r r))
                    (rectangle (w h) (make-circle (+ w h))))
            )
            `;
            const ptc = parseL51(tc2);
            expect(ptc).toSatisfy(isOkT(isProgram));
            mapv(ptc, (p: Program) => {
                const t = typeofProgram(p, initTEnv(p), p);
                // console.log(`Analyzed type ${JSON.stringify(t, null, 2)}`);
                expect(t).toSatisfy(isOkT(isTExp));
                mapv(t, (t1: TExp) => {
                    expect(t1).toStrictEqual(Shape);
                })
            })
        });

	});

});
