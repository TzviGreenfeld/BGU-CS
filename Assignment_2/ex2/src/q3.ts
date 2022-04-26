import {  Exp, isAtomicExp, isDefineExp, isLetPlusExp, parseL31, Program, LetPlusExp, LetExp, makeLetExp, makeLetPlusExp } from "./L31-ast";
import { Result, makeFailure, makeOk } from "../shared/result";
import { bind, map, pipe, isEmpty, find } from "ramda";
//
import {first, rest} from "../shared/list";
import { CExp, isAppExp, isCExp, isCompoundExp, isExp, isIfExp, isLetExp, isLitExp, isProcExp, isProgram, makeAppExp, makeDefineExp, makeIfExp, makeProcExp, makeProgram, ProcExp } from "../imp/L3-ast";

/*
Purpose: Transform L31 AST to L3 AST
Signature: l31ToL3(l31AST)
Type: [Exp | Program] => Result<Exp | Program>
*/
// export interface LetPlusExp { tag: "LetPlusExp"; bindings: Binding[]; body: CExp[]; }

const letPlusToLet = (exp : LetPlusExp ) : LetExp => {
    // const bindings = isEmpty(rest(exp.bindings)) ? first(exp.bindings) : letPlusToLet(makeLetPlusExp(rest(exp.bindings),exp.body));
    const bindings = [first(exp.bindings)]
    const body = isEmpty(rest(exp.bindings)) ? exp.body : [letPlusToLet(makeLetPlusExp(rest(exp.bindings),exp.body))];
    return makeLetExp(bindings, body);
}
    

const findLetPlus = (exp: Exp) : Exp => 
    isAtomicExp(exp) ?  exp :
        isLetExp(exp) ? exp :
            isLitExp(exp) ? exp :
                isDefineExp(exp) ? makeDefineExp( exp.var, findLetPlus(exp.val) as CExp)  : 
                    isAppExp(exp) ? makeAppExp(findLetPlus(exp.rator) as CExp , map(findLetPlus, exp.rands) as CExp[]) : 
                        isProcExp(exp) ? makeProcExp(exp.args, map(findLetPlus, exp.body) as CExp[]) :
                            isIfExp(exp) ? makeIfExp(findLetPlus(exp.test) as CExp, findLetPlus(exp.then) as CExp, findLetPlus(exp.then) as CExp) :
                                isLetPlusExp(exp) ? letPlusToLet(exp) :
                                    exp;


export const L31ToL3 = (exp: Exp | Program): Result<Exp | Program> =>{
    return isExp(exp) ? makeOk(findLetPlus(exp)) :
                // isProgram(exp) ? makeOk(makeProgram(map(findLetPlus, exp.exps)) :
                    makeFailure("er"); 
} 

