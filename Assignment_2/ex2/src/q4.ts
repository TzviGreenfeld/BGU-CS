import { Exp, Program } from '../imp/L3-ast';
import { Result, makeFailure } from '../shared/result';

/*
Purpose: Transform L3 AST to JavaScript program string
Signature: l30ToJS(l2AST)
Type: [EXP | Program] => Result<string>
*/
export const l30ToJS = (exp: Exp | Program): Result<string>  => 
    makeFailure("TODO");
