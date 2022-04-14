import { expect } from 'chai';
import { parseL3, parseL3Exp } from '../imp/L3-ast';
import { bind, Result, makeOk } from '../shared/result';
import { l30ToJS } from '../src/q4';
import { parse as p } from "../shared/parser";

const l30toJSResult = (x: string): Result<string> =>
    bind(bind(p(x), parseL3Exp), l30ToJS);

describe('Q4 Tests', () => {
    it('parses primitive ops', () => {
        expect(l30toJSResult(`(+ 3 5 7)`)).to.deep.equal(makeOk(`(3 + 5 + 7)`));
        expect(l30toJSResult(`(= 3 (+ 1 2))`)).to.deep.equal(makeOk(`(3 === (1 + 2))`));
    });

    it('parses "if" expressions', () => {
        expect(l30toJSResult(`(if (> x 3) 4 5)`)).to.deep.equal(makeOk(`((x > 3) ? 4 : 5)`));
    });

    it('parses "lambda" expressions', () => {
        expect(l30toJSResult(`(lambda (x y) (* x y))`)).to.deep.equal(makeOk(`((x,y) => (x * y))`));
        expect(l30toJSResult(`((lambda (x y) (* x y)) 3 4)`)).to.deep.equal(makeOk(`((x,y) => (x * y))(3,4)`));
    });
    
    it("defines constants", () => {
        expect(l30toJSResult(`(define pi 3.14)`)).to.deep.equal(makeOk(`const pi = 3.14`));
    });

    it("defines functions", () => {
        expect(l30toJSResult(`(define f (lambda (x y) (* x y)))`)).to.deep.equal(makeOk(`const f = ((x,y) => (x * y))`));
    });

    it("applies user-defined functions", () => {
        expect(l30toJSResult(`(f 3 4)`)).to.deep.equal(makeOk(`f(3,4)`));
    });

    it("parses functions with multiple body expressions", () => {
        expect(l30toJSResult(`(define g (lambda (x y) (+ x 2) (- y 3) (* x y)))`)).to.deep.equal(makeOk(`const g = ((x,y) => {(x + 2); (y - 3); return (x * y);})`));
    });

    it("let expressions", () => {
        expect(l30toJSResult(`(let ((a 1) (b 2)) (+ a b))`)).to.deep.equal(makeOk(`((a,b) => (a + b))(1,2)`));
    });


    it('parses programs', () => {
        expect(bind(parseL3(`(L3 (define b (> 3 4)) (define x 5) (define f (lambda (y) (+ x y))) (define g (lambda (y) (* x y))) (if (not b) (f 3) (g 4)) ((lambda (x) (* x x)) 7))`), l30ToJS)).to.deep.equal(makeOk(`const b = (3 > 4);\nconst x = 5;\nconst f = ((y) => (x + y));\nconst g = ((y) => (x * y));\n((!b) ? f(3) : g(4));\nconsole.log(((x) => (x * x))(7));`));
    });

    it("literal expressions", () => {
        expect(l30toJSResult(`"a"`)).to.deep.equal(makeOk(`"a"`));
        expect(l30toJSResult(`'a`)).to.deep.equal(makeOk(`Symbol.for("a")`));
        expect(l30toJSResult(`symbol?`)).to.deep.equal(makeOk(`((x) => (typeof (x) === symbol))`))
        expect(l30toJSResult(`(string=? "a" "b")`)).to.deep.equal(makeOk(`("a" === "b")`))
    });

});