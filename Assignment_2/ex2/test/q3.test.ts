import { expect } from 'chai';
import { unparseL31, parseL31, parseL31Exp } from '../src/L31-ast';
import { L31ToL3 } from '../src/q3';
import { makeOk, bind, isFailure } from '../shared/result';
import { parse as p } from "../shared/parser";

describe('Q3 Tests', () => {
     it('test parse/unparse let*', () => {
          expect(bind(bind(p(`(let* ((a 1) (b (+ a 2))) (* a b))`),parseL31Exp), x=>makeOk(unparseL31(x)))).to.deep.equal(makeOk(`(let* ((a 1) (b (+ a 2))) (* a b))`));
         });

     it('test parse wrong let', () => {
          expect(bind(p(`(let* ((a 1) (b (+ a 2)) (* a b))`),parseL31Exp)).is.satisfy(isFailure);
     });


     it('test parse/unparse program', () => {
          expect(bind(parseL31(`(L31 (define a 1) (if (> a 3) (let ((a 1) (b a)) (* a b)) (let* ((a 1) (b a)) (* a b))))`), x=>makeOk(unparseL31(x)))).to.deep.equal(makeOk(`(L31 (define a 1) (if (> a 3) (let ((a 1) (b a)) (* a b)) (let* ((a 1) (b a)) (* a b))))`));
         });
     
     
     it('trnasform let*-exp in to let-exp', () => {
          expect(bind(bind(bind(p(`(let* ((a 1) (b (+ a 2))) (* a b))`), parseL31Exp), L31ToL3),  x=>makeOk(unparseL31(x)))).to.deep.equal(makeOk(`(let ((a 1)) (let ((b (+ a 2))) (* a b)))`));
     });

     it('trnasform let* program in to let', () => {
          expect(bind(bind(parseL31(`(L31 (define a 1) (if (> a 3) (let ((a 1) (b a)) (* a b)) (let* ((a 1) (b a)) (* a b))))`), L31ToL3),  x=>makeOk(unparseL31(x)))).to.deep.equal(makeOk(`(L31 (define a 1) (if (> a 3) (let ((a 1) (b a)) (* a b)) (let ((a 1)) (let ((b a)) (* a b)))))`));
     });
     
});