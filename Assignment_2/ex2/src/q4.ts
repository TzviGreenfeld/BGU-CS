import { AtomicExp, BoolExp, Exp, PrimOp, Program, StrExp, VarRef, makeProgram } from '../imp/L3-ast';
import { Result, makeFailure, makeOk } from '../shared/result';
////
import {bind, map} from "ramda"
import {isBoolExp, isNumExp, isStrExp, isLitExp,
     isVarRef, isProcExp, isIfExp, isAppExp, isPrimOp,
      isLetExp, isDefineExp, isProgram, AppExp, VarDecl, ProcExp, LitExp, LetExp, Binding, makeAppExp, makeProcExp } from '../src/L31-ast';

import {isArray, isString, isNumber, isBoolean, isError} from '../shared/type-predicates';
import {isClosure, isSymbolSExp, isEmptySExp, isCompoundSExp, closureToString,compoundSExpToString, Value} from '../imp/L3-value';
import { CExp, isAtomicExp } from './L31-ast';
import exp from "constants";
               
export const l30ToJS = (exp: Exp | Program): Result<string>  => {
    const Jsprogram = unparseL31(exp)
    return Jsprogram.includes("PARSING ERROR!") ? makeFailure("parsing error") : makeOk(Jsprogram)
}


export const valueToString = (val: Value): string =>
isNumber(val) ?  val.toString() :
val === true ? 'true' :
val === false ? 'false' :
isString(val) ? `"${val}"` :
isClosure(val) ? closureToString(val) :
isPrimOp(val) ? val.op :
isSymbolSExp(val) ? `Symbol.for("${val.val}")` :
isEmptySExp(val) ? "" :
isCompoundSExp(val) ? compoundSExpToString(val) :
val;
    
// Add a quote for symbols, empty and compound sexp - strings and numbers are not quoted.
const unparseLitExp = (le: LitExp): string =>
    isEmptySExp(le.val) ? `` :
        isSymbolSExp(le.val) ? valueToString(le.val) :
            isCompoundSExp(le.val) ? valueToString(le.val) :
                `${le.val}`;



const unparseProcExp = (pe: ProcExp): string => 
    `((${map((arg: VarDecl) => arg.var, pe.args).join(",")}) => ${unparseL31(makeProgram(pe.body as Exp[]))})`


const unparseLetExp = (le: LetExp) : string => 
    unparseAppExp(rewriteLet(le))

// changed this for tests
const unparseAppExp = (exp: AppExp) : string =>
    isVarRef(exp.rator)? unparseFuncitonRefrence(exp) :
        isProcExp(exp.rator)? unparseProcOp(exp) : 
            isPrimOp(exp.rator)? unparseAtomicOp(exp)  :
                "never"              


const unparseProcOp = (exp: AppExp): string =>
    `(${unparseProcExp(exp.rator as ProcExp)})(${map(unparseL31, exp.rands as Exp[]).join(",")})`

// changed this for tests
/////////////////////////////////////////////
const unparseFuncitonRefrence  = (exp: AppExp): string =>
    // `${(exp.rator as VarRef).var}(${ map(unparseL31, exp.rands as Exp[]).join(",")})`
    `${unparseL31(exp.rator as Exp)}(${ map(unparseL31, exp.rands as Exp[]).join(",")})`
////////////////////////////

const unparseAtomicOp = (exp: AppExp): string => 
    ["+", "-", "*", "/", "<", ">"].includes((exp.rator as PrimOp).op) ? `(${ map(unparseL31, exp.rands as Exp[]).join(" "+(exp.rator as PrimOp).op+" ")})` :
        ["=", "eq?", "string=?"].includes((exp.rator as PrimOp).op) ? `(${ map(unparseL31, exp.rands as Exp[]).join(" === ")})` : // string=?
           "not" === ((exp.rator as PrimOp).op) ? `!${(unparseL31(exp.rands[0] as Exp))}` :
                        "never"

const unparsePrimOp = (exp: PrimOp) : string =>
    exp.op === "and" ? "&&" :
        exp.op === "or" ? "||" :
            exp.op === "number?" ? "((x) => (typeof (x) === number))" :
                exp.op === "boolean?" ? "((x) => (typeof(x) === boolean))" :
                    exp.op === "symbol?" ? "((x) => (typeof (x) === symbol))" :
                        exp.op === "string?" ? "((x) => (typeof(x) === string))" :
                            exp.op === "=" || exp.op === "eq?" ? "===" :
                                "never"


export const unparseL31 = (exp: Program | Exp): string =>
    isBoolExp(exp) ? valueToString(exp.val) :
        isNumExp(exp) ? valueToString(exp.val) :
            isStrExp(exp) ? valueToString(exp.val) :
                isLitExp(exp) ? unparseLitExp(exp) :
                    isVarRef(exp) ? exp.var :
                        isProcExp(exp) ? unparseProcExp(exp) :
                            isIfExp(exp) ? `(${unparseL31(exp.test)} ? ${unparseL31(exp.then)} : ${unparseL31(exp.alt)})` :
                                isPrimOp(exp) ? unparsePrimOp(exp) :
                                    // isAppExp(exp) ? (isPrimOp(exp.rator) ? unparseAppExp(exp) : unparseL31(exp.rator)) :
                                    isAppExp(exp) ? (isPrimOp(exp.rator) ? unparseAppExp(exp) : unparseFuncitonRefrence(exp)) :
                                        isLetExp(exp) ? unparseLetExp(exp) :
                                            isDefineExp(exp) ? `const ${exp.var.var} = ${unparseL31(exp.val)}` :
                                                isProgram(exp) ? map(unparseL31, exp.exps).join(";\n") :
                                                    "PARSING ERROR!"    


export const rewriteLet = (e: LetExp): AppExp => {
    const vars = map((b) => b.var, e.bindings);
    const vals = map((b) => b.val, e.bindings);
    return makeAppExp(
        makeProcExp(vars, e.body),
        vals);
}