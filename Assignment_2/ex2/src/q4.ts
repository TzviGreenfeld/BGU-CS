import { BoolExp, Exp, PrimOp, Program } from '../imp/L3-ast';
import { Result, makeFailure } from '../shared/result';
////
import {bind, map} from "ramda"
import {isBoolExp, isNumExp, isStrExp, isLitExp,
     isVarRef, isProcExp, isIfExp, isAppExp, isPrimOp,
      isLetExp, isDefineExp, isProgram, AppExp} from '../imp/L3-ast';

import {isArray, isString, isNumber, isBoolean, isError} from '../shared/type-predicates';
import {isClosure, isSymbolSExp, isEmptySExp, isCompoundSExp} from '../imp/L3-value';
import { CExp, isAtomicExp } from './L31-ast';
// string → token array → S-Exp → AST
//     Scanner   →    Reader → Parser

// Exp = DefineExp | CExp;
// AtomicExp = NumExp | BoolExp | StrExp | PrimOp | VarRef;
// CompoundExp = AppExp | IfExp | ProcExp | LetExp | LitExp;
// CExp =  AtomicExp | CompoundExp;

const appExpToJS = (exp : AppExp) : string =>{
    const op = exp.rator;
    if (isPrimOp(op)){ 
        // atomic
        if (["+", "-", "*", "/"].includes(op.op)){
            return map((x)=> isNumExp(x) ? x.val : (isCom) ,exp.rands).join(" " + op.op + " ");
        }else if ([">", "<"].includes(op.op)){
            
        }
        // compound
    }

const valueToString = (val: CExp): string =>
    isNumber(val) ?  val.toString() :
        isBoolExp(val) ? (  val.val === true ? 'true' :'false') :
            isString(val) ? `"${val}"` :
                isClosure(val) ? closureToString(val) :
                    isPrimOp(val) ? val.op :
                        isSymbolSExp(val) ? val.val :
                            isEmptySExp(val) ? "'()" :
                                isCompoundSExp(val) ? compoundSExpToString(val) :
                                    val;

export const unparseL31 = (exp: Program | Exp): string =>
    isBoolExp(exp) ? valueToString(exp.val) :
        isNumExp(exp) ? valueToString(exp.val) :
            isStrExp(exp) ? valueToString(exp.val) :
                isLitExp(exp) ? unparseLitExp(exp) :
                    isVarRef(exp) ? exp.var :
                        isProcExp(exp) ? unparseProcExp(exp) :
                            isIfExp(exp) ? `(if ${unparseL31(exp.test)} ${unparseL31(exp.then)} ${unparseL31(exp.alt)})` :
                                isAppExp(exp) ? `(${unparseL31(exp.rator)} ${unparseLExps(exp.rands)})` :
                                    isPrimOp(exp) ? exp.op :
                                        isLetExp(exp) ? unparseLetExp(exp) :
                                            isDefineExp(exp) ? `(define ${exp.var.var} ${unparseL31(exp.val)})` :
                                                isProgram(exp) ? `(L31 ${unparseLExps(exp.exps)})` :
                                                    isLetPlusExp(exp) ? unparseLetPlusExp(exp):
                                                        exp;  

                                                        /*
Purpose: Transform L3 AST to JavaScript program string
Signature: l30ToJS(l2AST)
Type: [EXP | Program] => Result<string>
*/                                                        
export const l30ToJS = (exp: Exp | Program): Result<string>  => 
    makeFailure("TODO");
