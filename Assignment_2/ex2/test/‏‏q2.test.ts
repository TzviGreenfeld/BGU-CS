import fs from "fs";
import { expect } from 'chai';
import {  evalL3program } from '../imp/L3-eval';
import { Value } from "../imp/L3-value";
import { Result, bind, makeOk } from "../shared/result";
import { parseL3 } from "../imp/L3-ast";
import { listPrim} from "../imp/evalPrimitive";


const evalP = (x: string): Result<Value> =>
    bind(parseL3(x), evalL3program);


const q2: string = fs.readFileSync(__dirname + '/../src/q2.l3', { encoding: 'utf-8' });

const q2_test_string: string = `

(define empty? (lambda (x) (eq? x '() )))

(define compose
    (lambda (f g)
        (lambda (x)
            (f (g x))
        )
    )
)

(define pipe
    (lambda (fs)  
        (if (empty? fs)
            (lambda (x) x)
            (compose (pipe (cdr fs)) (car fs))
        )
    )
)

(define square 
    (lambda (x) 
        (make-ok (* x x))
    )
)

(define inverse 
    (lambda (x) 
        (if (= x 0) 
            (make-error "div by 0") 
            (make-ok (/ 1 x))
        )
    )
)

(define inverse-square-inverse (pipe (list inverse (bind square) (bind inverse))))
`;

describe('Q4 Tests', () => {

    /**
     * Q2.1--(a) tests
     */
    it("Q21a", () => {
        expect(evalP(`(L3`+ q2 + `3)`)).to.deep.equal(makeOk(3));
        expect(evalP(`(L3` + q2 + `(define r1 (make-ok 3)) (ok? r1)` + `)`)).to.deep.equal(makeOk(true));
        expect(evalP(`(L3` + q2 + `(define r1 (make-ok 3)) (error? r1)` + `)`)).to.deep.equal(makeOk(false));
        expect(evalP(`(L3` + q2 + `(define r1 (make-ok 3)) (result? r1)` + `)`)).to.deep.equal(makeOk(true));
        expect(evalP(`(L3` + q2 + `(define r1 (make-ok 3)) (result->val r1)` + `)`)).to.deep.equal(makeOk(3));
        expect(evalP(`(L3` + q2 + `(define r2 (make-error "Error: key not found")) (ok? r2)` + `)`)).to.deep.equal(makeOk(false));
        expect(evalP(`(L3` + q2 + `(define r2 (make-error "Error: key not found")) (error? r2)` + `)`)).to.deep.equal(makeOk(true));
        expect(evalP(`(L3` + q2 + `(define r2 (make-error "Error: key not found")) (result? r2)` + `)`)).to.deep.equal(makeOk(true));
        expect(evalP(`(L3` + q2 + `(define r2 (make-error "Error: key not found")) (result->val r2)` + `)`)).to.deep.equal(makeOk("Error: key not found"));
        expect(evalP(`(L3` + q2 + `(define r3 'ok) (ok? r3)` + `)`)).to.deep.equal(makeOk(false));
        expect(evalP(`(L3` + q2 + `(define r3 'ok) (error? r3)` + `)`)).to.deep.equal(makeOk(false));
        expect(evalP(`(L3` + q2 + `(define r3 'ok) (result? r3)` + `)`)).to.deep.equal(makeOk(false));
        expect(evalP(`(L3` + q2 + `(define r3 'error) (ok? r3)` + `)`)).to.deep.equal(makeOk(false));
        expect(evalP(`(L3` + q2 + `(define r3 'error) (error? r3)` + `)`)).to.deep.equal(makeOk(false));
        expect(evalP(`(L3` + q2 + `(define r3 'error) (result? r3)` + `)`)).to.deep.equal(makeOk(false));
    });

    /**
     * Q2.1--(b) tests
     */
    it("Q21b", () => {
        expect(evalP(`(L3` + q2 + q2_test_string + `3)`)).to.deep.equal(makeOk(3));
        expect(evalP(`(L3` + q2 + q2_test_string + `(result->val (inverse-square-inverse 2))` + `)`)).to.deep.equal(makeOk(4));
        expect(evalP(`(L3` + q2 + q2_test_string + `(result->val (inverse-square-inverse 0))` + `)`)).to.deep.equal(makeOk("div by 0"));
    });

    /**
     * Q2.2 tests
     */
    it("Q22", () => {
        expect(evalP(`(L3` + q2 + q2_test_string + `3)`)).to.deep.equal(makeOk(3));
        expect(evalP(`(L3` + q2 + q2_test_string + `(define dict (make-dict)) (dict? dict)` + `)`)).to.deep.equal(makeOk(true));
        expect(evalP(`(L3` + q2 + q2_test_string + `(define dict (make-dict)) (dict? '(2  4))` + `)`)).to.deep.equal(makeOk(false));
        expect(evalP(`(L3` + q2 + q2_test_string + `(define dict (make-dict)) (result->val (get (result->val (put dict 3 4)) 3))` + `)`)).to.deep.equal(makeOk(4));
        expect(evalP(`(L3` + q2 + q2_test_string + `(define dict (make-dict)) (result->val (get (result->val (put (result->val (put dict 3 4) ) 3 5)) 3))` + `)`)).to.deep.equal(makeOk(5));
        expect(evalP(`(L3` + q2 + q2_test_string + `(define dict (make-dict)) (result->val (get (result->val (put dict 3 4)) 4))` + `)`)).to.deep.equal(makeOk("Key not found"));
        expect(evalP(`(L3` + q2 + q2_test_string + `(define dict (make-dict)) (result->val (put '(1 2) 3 4))` + `)`)).to.deep.equal(makeOk("Error: not a dictionary"));
        expect(evalP(`(L3` + q2 + q2_test_string + `(define dict (make-dict)) (result->val (get '(1 2) 1))` + `)`)).to.deep.equal(makeOk("Error: not a dictionary"));
    });

    /**
     * Q2.3--(a) tests
     */
    it("Q23a", () => {
        expect(evalP(`(L3` + q2 + q2_test_string + `(result->val (get (result->val (map-dict (result->val (put (result->val (put (make-dict) 1 #t)) 2 #f)) (lambda (x) (not x )))) 1))` + `)`)).to.deep.equal(makeOk(false));
        expect(evalP(`(L3` + q2 + q2_test_string + `(result->val (get (result->val (map-dict (result->val (put (result->val (put (make-dict) 1 #t)) 2 #f)) (lambda (x) (not x )))) 2))` + `)`)).to.deep.equal(makeOk(true));
    });
    

    /**
     * Q2.3--(b) tests
     */
    it("Q23b", () => {
        expect(evalP(`(L3` + q2 + q2_test_string + `(result->val (get (result->val (filter-dict (result->val (put (result->val (put (make-dict) 2 3)) 3 4)) (lambda (x y) (< (+ x y) 6)))) 2))` + `)`)).to.deep.equal(makeOk(3));
        expect(evalP(`(L3` + q2 + q2_test_string + `(result->val (get (result->val (filter-dict (result->val (put (result->val (put (make-dict) 2 3)) 3 4)) (lambda (x y) (< (+ x y) 6)))) 3))` + `)`)).to.deep.equal(makeOk("Key not found"));
    });

});