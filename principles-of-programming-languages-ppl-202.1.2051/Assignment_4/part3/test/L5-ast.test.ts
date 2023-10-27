import { isNumExp, isBoolExp, isVarRef, isPrimOp, isProgram, isDefineExp, isVarDecl,
         isAppExp, isStrExp, isIfExp, isProcExp, isLetExp, isLitExp, isLetrecExp, isSetExp,
         parseL51Exp, unparse, Exp, parseL51, isDefineTypeExp, isTypeCaseExp, Program, Parsed } from "../src/L5/L5-ast";
import { Result, bind, mapv, isOkT, makeOk, isFailure } from "../src/shared/result";
import { parse as parseSexp } from "../src/shared/parser";
import { first, second } from "../src/shared/list";
import { isProcTExp, isUserDefinedNameTExp, isUserDefinedTExp, parseTE } from "../src/L5/TExp";

const p = (x: string): Result<Exp> => bind(parseSexp(x), (p) => parseL51Exp(p, []));

describe('L51 Parser', () => {
    it('parses atomic expressions', () => {
        expect(p("1")).toSatisfy(isOkT(isNumExp));
        expect(p("#t")).toSatisfy(isOkT(isBoolExp));
        expect(p("x")).toSatisfy(isOkT(isVarRef));
        expect(p('"a"')).toSatisfy(isOkT(isStrExp));
        expect(p(">")).toSatisfy(isOkT(isPrimOp));
        expect(p("=")).toSatisfy(isOkT(isPrimOp));
        expect(p("string=?")).toSatisfy(isOkT(isPrimOp));
        expect(p("eq?")).toSatisfy(isOkT(isPrimOp));
        expect(p("cons")).toSatisfy(isOkT(isPrimOp));
    });

    it('parses programs', () => {
        expect(parseL51("(L51 (define x 1) (> (+ x 1) (* x x)))")).toSatisfy(isOkT(isProgram));
    });

    it('parses "define" expressions', () => {
        const def = p("(define x 1)");
        expect(def).toSatisfy(isOkT(isDefineExp));
        if (isOkT(isDefineExp)(def)) {
            expect(def.value.var).toSatisfy(isVarDecl);
            expect(def.value.val).toSatisfy(isNumExp);
        }
    });

    it('parses "define" expressions with type annotations', () => {
        const define = "(define (a : number) 1)";
        expect(p(define)).toSatisfy(isOkT(isDefineExp));
    });

    it('parses applications', () => {
        expect(p("(> x 1)")).toSatisfy(isOkT(isAppExp));
        expect(p("(> (+ x x) (* x x))")).toSatisfy(isOkT(isAppExp));
    });

    it('parses "if" expressions', () => {
        expect(p("(if #t 1 2)")).toSatisfy(isOkT(isIfExp));
        expect(p("(if (< x 2) x 2)")).toSatisfy(isOkT(isIfExp));
    });

    it('parses procedures', () => {
        expect(p("(lambda () 1)")).toSatisfy(isOkT(isProcExp));
        expect(p("(lambda (x) x x)")).toSatisfy(isOkT(isProcExp));
    });

    it('parses procedures with type annotations', () => {
        expect(p("(lambda ((x : number)) : number (* x x))")).toSatisfy(isOkT(isProcExp));
    });

    it('parses "let" expressions', () => {
        expect(p("(let ((a 1) (b #t)) (if b a (+ a 1)))")).toSatisfy(isOkT(isLetExp));
    });

    it('parses "let" expressions with type annotations', () => {
        expect(p("(let (((a : boolean) #t) ((b : number) 2)) (if a b (+ b b)))")).toSatisfy(isOkT(isLetExp));
    });

    it('parses literal expressions', () => {
        expect(p("'a")).toSatisfy(isOkT(isLitExp));
        expect(p("'()")).toSatisfy(isOkT(isLitExp));
        expect(p("'(1)")).toSatisfy(isOkT(isLitExp));
    });

    it('parses "letrec" expressions', () => {
        expect(p("(letrec ((e (lambda (x) x))) (e 2))")).toSatisfy(isOkT(isLetrecExp));
    });

    it('parses "letrec" expressions with type annotations', () => {
        expect(p("(letrec (((p : (number * number -> number)) (lambda ((x : number) (y : number)) (+ x y)))) (p 1 2))")).toSatisfy(isOkT(isLetrecExp));
    });

    it('parses "set!" expressions', () => {
        expect(p("(set! x 1)")).toSatisfy(isOkT(isSetExp));
    });
});

describe('L51 Define-Type Parser', () => {
    it('TExpParses define-type expressions', () => {
        const dt1 = `
            (define-type Shape
                (circle (radius : number))
                (rectangle (width : number)
                        (height : number)))
        `;
        const ud1 = parseTE(dt1);
        expect(ud1).toSatisfy(isOkT(isUserDefinedTExp));
    });

    it('parses define-type expressions', () => {
        const dt1 = `
        (L51 
            (define-type Shape
                (circle (radius : number))
                (rectangle (width : number)
                        (height : number)))
        )
        `;
            const pdt1 = parseL51(dt1);
        mapv(pdt1, (p1: Program) => expect(first(p1.exps)).toSatisfy(isDefineTypeExp));
        // console.log(`PDT1 = ${JSON.stringify(pdt1, null, 2)}`);
        //bind(pdt1, (parsed) => 
        //    mapv(unparse(parsed), (s) => console.log(`UPDT1 = ${s}`)));
        });

    it('parses recursive / empty record define-type expressions', () => {
        const dt2 = `
        (L51 
            (define-type Env
                (EmptyEnv)
                (ExtEnv (var : string)
                        (val : number)
                        (env : Env))))
        `;
        const pdt2 = parseL51(dt2);
        expect(pdt2).toSatisfy(isOkT(isProgram));
        mapv(pdt2, (p2: Program) => expect(first(p2.exps)).toSatisfy(isDefineTypeExp));
        // console.log(`${JSON.stringify(pdt2, null, 2)}`);
    });

    it('parses define-type expressions with defined types', () => {
        const dt1 = `
        (L51 
            (define-type Shape
                (circle (radius : number))
                (rectangle (width : number)
                        (height : number)))

            (define-type ShapeList
                (emptyShapeList)
                (nonEmptyShapeList (first : Shape) (rest : ShapeList)))
        )
        `;
        const pdt1 = parseL51(dt1);
        expect(pdt1).toSatisfy(isOkT(isProgram));
        mapv(pdt1, (p1: Program) => expect(first(p1.exps)).toSatisfy(isDefineTypeExp));
        mapv(pdt1, (p1: Program) => expect(second(p1.exps)).toSatisfy(isDefineTypeExp));
    });

    it('fails to parse define-type expressions with undefined user-defined types', () => {
        const dt = `
        (L51 
            (define-type Env
                (EmptyEnv)
                (ExtEnv (var : string)
                        (val : number)
                        (env : Env2))))
        `;
        const pdt2 = parseL51(dt);
        expect(pdt2).toSatisfy(isFailure);
    });

    it('parses type-case expressions', () => {
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
        const ptc1 = parseL51(tc1);
        expect(ptc1).toSatisfy(isOkT(isProgram));
        mapv(ptc1, (p1: Program) => expect(first(p1.exps)).toSatisfy(isDefineTypeExp));
        mapv(ptc1, (p1: Program) => expect(p1.exps[2]).toSatisfy(isTypeCaseExp));

        // console.log(`PTC1 = ${JSON.stringify(ptc1, null, 2)}`);
        // bind(ptc1, (parsed) => 
        //    mapv(unparse(parsed), (s) => console.log(`UPTC1 = ${s}`)));
    });

    it('It fails to parse type-case expressions with undefined user defined types', () => {
        const tc1 = `
        (L51 
            (define-type Shape
                (circle (radius : number))
                (rectangle (width : number)
                        (height : number)))
            (define [s : circle] (make-circle 1))
            (type-case Shape s
                (circle2 (r) (* (* r r) 3.14))
                (rectangle (w h) (* w h)))
        )
        `;
        const ptc2 = parseL51(tc1);
        expect(ptc2).toSatisfy(isFailure);
    });

    it('It parses any', () => {
        const p = `
        (L51 
            (define (f : (any -> boolean))
                (lambda ((x : any)) : boolean #t))
        )
        `
        const pp = parseL51(p);
        expect(pp).toSatisfy(isOkT(isProgram));
        mapv(pp, (p: Program) => expect(first(p.exps)).toSatisfy(isDefineExp));
    })
});

describe('L51 Define-Type unparse', () => {
    // parse, unparse, remove-whitespace
    const roundTrip = (x: string): Result<string> => 
        bind(parseL51(x), (p: Program) =>
            mapv(unparse(p), (s: string) => 
                s.replace(/\s/g, "")));

    // Compare original string with round-trip (neutralizes white spaces)
    const testProgram = (x: string): Result<void> =>
            mapv(roundTrip(x), (rt: string) => {
                // console.log(`roundTrip success`);
                expect(x.replace(/\s/g, "")).toEqual(rt);
            });
    
    it('unparses define-type expressions', () => {
        const dt1 = `
        (L51 
            (define-type Shape
                (circle (radius : number))
                (rectangle (width : number)
                           (height : number)))
        )
        `;
        testProgram(dt1);
    });

    it('parses recursive / empty record define-type expressions', () => {
        const dt2 = `
        (L51 
            (define-type Env
                (EmptyEnv)
                (ExtEnv (var : string)
                        (val : number)
                        (env : Env)))
        )
        `;
        testProgram(dt2);
    });

    it('parses type-case expressions', () => {
        const tc1 = `
        (L51 
            (define-type Shape
                (circle (radius : number))
                (rectangle (width : number)
                           (height : number)))
            (define [s : circle] (make-circle 1))
            (type-case Shape s
                (circle (r) (* (* r r) 3.14))
                (rectangle (w h) (* w h)))
        )
        `;
        testProgram(tc1);
    });

});


describe('L51 Unparse', () => {
    const roundTrip = (x: string): Result<string> => bind(p(x), unparse);

    it('unparses "define" expressions with type annotations', () => {
        const define = "(define (a : number) 1)";
        expect(roundTrip(define)).toEqual(makeOk(define));
    });

    it('unparses procedures with type annotations', () => {
        const lambda = "(lambda ((x : number)) : number (* x x))";
        expect(roundTrip(lambda)).toEqual(makeOk(lambda));
    });

    it('unparses "let" expressions with type annotations', () => {
        const let1 = "(let (((a : boolean) #t) ((b : number) 2)) (if a b (+ b b)))";
        expect(roundTrip(let1)).toEqual(makeOk(let1));
    });

    it('unparses "letrec" expressions', () => {
        const letrec = "(letrec (((p : (number * number -> number)) (lambda ((x : number) (y : number)) (+ x y)))) (p 1 2))";
        expect(roundTrip(letrec)).toEqual(makeOk(letrec));
    });

    it('unparses any', () => {
        const d = `(define (x : any) 1)`;
        expect(roundTrip(d)).toEqual(makeOk(d));
    })
});
