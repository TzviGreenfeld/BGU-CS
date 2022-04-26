import { Exp, Program } from "./L31-ast";
import { Result, makeFailure, makeOk } from "../shared/result";
import { bind, map, pipe, isEmpty, find } from "ramda";
//
import {first, rest} from "../shared/list";
import { LetExp, makeLetExp, makeProgram, CExp, isAppExp, isCExp, isCompoundExp, isExp,
     isIfExp, isLetExp, isLitExp, isProcExp, isProgram, makeAppExp, makeDefineExp, makeIfExp,
      makeProcExp, ProcExp,  isAtomicExp, isDefineExp, makeBinding, makeVarDecl, 
      parseL31,  makeLetPlusExp, LetPlusExp, isLetPlusExp  } from "./L31-ast";

/*
Purpose: Transform L31 AST to L3 AST
Signature: l31ToL3(l31AST)
Type: [Exp | Program] => Result<Exp | Program>
*/
// export interface LetPlusExp { tag: "LetPlusExp"; bindings: Binding[]; body: CExp[]; }

const letPlusToLet = (exp : LetPlusExp ) : LetExp => {
    // const bindings = isEmpty(rest(exp.bindings)) ? first(exp.bindings) : letPlusToLet(makeLetPlusExp(rest(exp.bindings),exp.body));
    const key = first(exp.bindings).var.var;
    const val = first(exp.bindings).val;
    const bindings = [makeBinding(key, val as CExp)];
    const body = isEmpty(rest(exp.bindings)) ? exp.body : [letPlusToLet(makeLetPlusExp(rest(exp.bindings),exp.body))];
    return makeLetExp(bindings, body);
}
    

const findLetPlus = (exp: CExp) : CExp => 
    isAtomicExp(exp) ?  exp :
        isLetExp(exp) ? makeLetExp(exp.bindings, map(findLetPlus,exp.body)) :
            isLitExp(exp) ? exp :
                    isAppExp(exp) ? makeAppExp(findLetPlus(exp.rator), map(findLetPlus, exp.rands)) : 
                        isProcExp(exp) ? makeProcExp(exp.args, map(findLetPlus, exp.body)) :
                            isIfExp(exp) ? makeIfExp(findLetPlus(exp.test), findLetPlus(exp.then) , findLetPlus(exp.then)) :
                                isLetPlusExp(exp) ? letPlusToLet(exp) :
                                    exp;



export const L31ToL3 = (exp: Exp | Program): Result<Exp | Program> =>{
    return isExp(exp) ? (isDefineExp(exp) ? makeOk(exp): makeOk(findLetPlus(exp))) :
                isProgram(exp) ? makeOk(makeProgram(map( (exp) => isDefineExp(exp) ? exp: findLetPlus(exp), exp.exps))) :
                    makeFailure("Error"); 
} 

