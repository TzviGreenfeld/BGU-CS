// L5-typecheck
// ========================================================
import { equals, filter, flatten, includes, map, intersection, zipWith, reduce, empty, all, any, Tuple } from 'ramda';
import {
    isAppExp, isBoolExp, isDefineExp, isIfExp, isLetrecExp, isLetExp, isNumExp,
    isPrimOp, isProcExp, isProgram, isStrExp, isVarRef, unparse, parseL51,
    AppExp, BoolExp, DefineExp, Exp, IfExp, LetrecExp, LetExp, NumExp, SetExp, LitExp,
    Parsed, PrimOp, ProcExp, Program, StrExp, isSetExp, isLitExp,
    isDefineTypeExp, isTypeCaseExp, DefineTypeExp, TypeCaseExp, CaseExp, isAtomicExp, isCompoundExp, makeProcExp, makeVarDecl, VarDecl, CExp, makeCaseExp, makeIfExp, isCaseExp
} from "./L5-ast";
import { applyTEnv, ExtendTEnv, isEmptyTEnv, makeEmptyTEnv, makeExtendTEnv, TEnv } from "./TEnv";
import {
    isTupleTExp, isEmptyTupleTExp, isNonEmptyTupleTExp, NonEmptyTupleTExp,
    LitTExp, makeLitTExp, isLitTExp,
    isProcTExp, makeBoolTExp, makeNumTExp, makeProcTExp, makeStrTExp, makeVoidTExp,
    parseTE, unparseTExp, Record,
    BoolTExp, NumTExp, StrTExp, TExp, VoidTExp, UserDefinedTExp, isUserDefinedTExp, UDTExp,
    isNumTExp, isBoolTExp, isStrTExp, isVoidTExp,
    isRecord, ProcTExp, makeUserDefinedNameTExp,
    Field, makeAnyTExp, isAnyTExp, isUserDefinedNameTExp, makeRecord,
    makeUserDefinedTExp, isTExp, isAtomicTExp, isCompoundTExp, isTVar, UserDefinedNameTExp
} from "./TExp";
import { isEmpty, allT, first, rest, cons } from '../shared/list';
import { Result, makeFailure, bind, makeOk, zipWithResult, mapv, mapResult, isFailure, either, resultToOptional, isOk, isOkT } from '../shared/result';
import { REFUSED } from 'dns';
import { diffieHellman } from 'crypto';
import { isClosure } from './L5-value';
import { equal } from 'assert';
import { isatty } from 'tty';
import { BlobOptions } from 'buffer';
import { format } from 'path';
import { Box, makeBox, setBox, unbox } from '../shared/box';

// L51
export const getTypeDefinitions = (p: Program): UserDefinedTExp[] => {
    const iter = (head: Exp, tail: Exp[]): UserDefinedTExp[] =>
        isEmpty(tail) && isDefineTypeExp(head) ? [head.udType] :
            isEmpty(tail) ? [] :
                isDefineTypeExp(head) ? cons(head.udType, iter(first(tail), rest(tail))) :
                    iter(first(tail), rest(tail));
    return isEmpty(p.exps) ? [] :
        iter(first(p.exps), rest(p.exps));
}

// L51
export const getDefinitions = (p: Program): DefineExp[] => {
    const iter = (head: Exp, tail: Exp[]): DefineExp[] =>
        isEmpty(tail) && isDefineExp(head) ? [head] :
            isEmpty(tail) ? [] :
                isDefineExp(head) ? cons(head, iter(first(tail), rest(tail))) :
                    iter(first(tail), rest(tail));
    return isEmpty(p.exps) ? [] :
        iter(first(p.exps), rest(p.exps));
}

// L51
export const getRecords = (p: Program): Record[] =>
    flatten(map((ud: UserDefinedTExp) => ud.records, getTypeDefinitions(p)));

// L51
export const getItemByName = <T extends { typeName: string }>(typeName: string, items: T[]): Result<T> =>
    isEmpty(items) ? makeFailure(`${typeName} not found`) :
        first(items).typeName === typeName ? makeOk(first(items)) :
            getItemByName(typeName, rest(items));

// L51
export const getUserDefinedTypeByName = (typeName: string, p: Program): Result<UserDefinedTExp> =>
    getItemByName(typeName, getTypeDefinitions(p));

// L51
export const getRecordByName = (typeName: string, p: Program): Result<Record> =>
    getItemByName(typeName, getRecords(p));

// L51
// Given the name of record, return the list of UD Types that contain this record as a case.
export const getRecordParents = (typeName: string, p: Program): UserDefinedTExp[] =>
    filter((ud: UserDefinedTExp): boolean => map((rec: Record) => rec.typeName, ud.records).includes(typeName),
        getTypeDefinitions(p));


// L51
// Given a user defined type name, return the Record or UD Type which it names.
// (Note: TS fails to type check either in this case)
export const getTypeByName = (typeName: string, p: Program): Result<UDTExp> => {
    const ud = getUserDefinedTypeByName(typeName, p);
    if (isFailure(ud)) {
        return getRecordByName(typeName, p);
    } else {
        return ud;
    }
}

// TODO L51
// const procToarr = (pr : ProcTExp) : TExp[] =>
//     return pr.paramTEs.concat([pr.returnTE])

const isSubs = (tes1: TExp[], tes2: TExp[], p: Program): boolean => {
    if (tes1.length !== tes2.length) {
        return false;
    }

    for (let i = 0; i < tes1.length; i++) {
        if (!isSubType(tes1[i], tes2[i], p)) {
            return false;
        }
    }
    return true;
}

const isEquals = (tes1: TExp[], tes2: TExp[], p: Program): boolean =>
    isSubs(tes1, tes2, p) && isSubs(tes2, tes2, p);




// Is te1 a subtype of te2?
// Atomic:  NumTExp | BoolTExp | StrTExp | VoidTExp | UserDefinedNameTExp | AnyTExp
// Compound: CompoundTExp = ProcTExp | TupleTExp | UserDefinedTExp | Record
const isSubType = (te1: TExp, te2: TExp, p: Program): boolean => {
    if (isAnyTExp(te2)) {
        return true;
    }

    if (isAtomicTExp(te2)) {
        if (isUserDefinedNameTExp(te2)) {
            const te2Res = getTypeByName(te2.typeName, p);
            if (isUserDefinedNameTExp(te1)) {
                const te1Res = getTypeByName(te1.typeName, p);
                if (isOk(te1Res) && isOk(te2Res)) {
                    // both UserDefinedNameTExp
                    return (isSubType(te1Res.value, te2Res.value, p));
                }
                return false;
            }
            /// AMITTTTTTTTTTTTTT
            if (isRecord(te1)) {
                return map((t: UserDefinedTExp): string => t.typeName, getRecordParents(te1.typeName, p))
                    .includes(te2.typeName)
            }
            // te2 is UserDefinedNameTExp, te1 AtomicTexp not UserDefinedNameTExp
            if (isOk(te2Res)) {
                return isSubType(te1, te2Res.value, p);
            }
            // couldnt find te2 type in p
            return false;
        }
        // both AtomicTexp not UserDefinedNameTExp,
        // hence true iff theyre same
        return (te2.tag == te1.tag);
    }

    if (isProcTExp(te2)) {
        if (isProcTExp(te1)) {
            // both procs, so
            // subs if every param is sub of same index param
            // and return type is sub as well
            return isSubs(te1.paramTEs.concat([te1.returnTE]),
                te2.paramTEs.concat([te2.returnTE]), p)
        }
        // only te2 is proc
        return false;
    }

    if (isTupleTExp(te2)) {
        if (isTupleTExp(te1)) {
            if (any(isEmptyTupleTExp, [te1, te2])) {
                // if one emty, true iff the othe empty as well
                return all(isEmptyTupleTExp, [te1, te2]);
            }
            if (isNonEmptyTupleTExp(te1) && isNonEmptyTupleTExp(te2)) {
                return isSubs(te1.TEs, te2.TEs, p);
            }
        }
    }

    if (isUserDefinedTExp(te2)) {
        if (isRecord(te1)) {
            // te1 record, true iff hes te2's record
            return map((t: UserDefinedTExp): string => t.typeName, getRecordParents(te1.typeName, p))
                .includes(te2.typeName)
        }
    }

    return false;
}

// TODO L51: Change this definition to account for user defined types
// Purpose: Check that the computed type te1 can be accepted as an instance of te2
// test that te1 is either the same as te2 or more specific
// Deal with case of user defined type names 
// Exp is only passed for documentation purposes.
// p is passed to provide the context of all user defined types
export const checkEqualType = (te1: TExp, te2: TExp, exp: Exp, p: Program): Result<TExp> => {
    if (equals(te1, te2)) {
        return makeOk(te2);
    }
    return isSubType(te1, te2, p) ? makeOk(te2) :
        makeFailure(`Incompatible types: ${te1.tag} and ${te2.tag} in ${exp.tag}`);
}

// L51
// Return te and its parents in type hierarchy to compute type cover
// Return type names (not their definition)
export const getParentsType = (te: TExp, p: Program): TExp[] =>
    (isNumTExp(te) || isBoolTExp(te) || isStrTExp(te) || isVoidTExp(te) || isAnyTExp(te)) ? [te] :
        isProcTExp(te) ? [te] :
            isUserDefinedTExp(te) ? [te] :
                isRecord(te) ? getParentsType(makeUserDefinedNameTExp(te.typeName), p) :
                    isUserDefinedNameTExp(te) ?
                        either(getUserDefinedTypeByName(te.typeName, p),
                            (ud: UserDefinedTExp) => [makeUserDefinedNameTExp(ud.typeName)],
                            (_) => either(getRecordByName(te.typeName, p),
                                (rec: Record) => cons(makeUserDefinedNameTExp(rec.typeName),
                                    map((ud) => makeUserDefinedNameTExp(ud.typeName),
                                        getRecordParents(rec.typeName, p))),
                                (_) => [])) :
                        [];

// L51
// Get the list of types that cover all ts in types.
export const coverTypes = (types: TExp[], p: Program): TExp[] => {
    // [[p11, p12], [p21], [p31, p32]] --> types in intersection of all lists
    const parentsList: TExp[][] = map((t) => getParentsType(t, p), types);
    return reduce<TExp[], TExp[]>(intersection, first(parentsList), rest(parentsList));
}

// Return the most specific in a list of TExps
// For example given UD(R1, R2):
// - mostSpecificType([R1, R2, UD]) = R1 (choses first out of record level)
// - mostSpecificType([R1, number]) = number  
export const mostSpecificType = (types: TExp[], p: Program): TExp =>
    reduce((min: TExp, element: TExp) => isSubType(element, min, p) ? element : min,
        makeAnyTExp(),
        types);

// L51
// Check that all t in types can be covered by a single parent type (not by 'any')
// Return most specific parent
export const checkCoverType = (types: TExp[], p: Program): Result<TExp> => {
    const cover = coverTypes(types, p);
    return isEmpty(cover) ? makeFailure(`No type found to cover ${map((t) => JSON.stringify(unparseTExp(t), null, 2), types).join(" ")}`) :
        makeOk(mostSpecificType(cover, p));
}


// Compute the initial TEnv given user defined types
// =================================================
// TODO L51
// Construct type environment for the user-defined type induced functions
// Type constructor for all records
// Type predicate for all records
// Type predicate for all user-defined-types
// All globally defined variables (with define)

// TODO: Define here auxiliary functions for TEnv computation

const makePred = (tName: string): ProcTExp =>
    makeProcTExp([makeUserDefinedNameTExp(tName)], makeBoolTExp())

const makeConstructor = (record: Record, p: Program): Result<ProcTExp> => {
    const recType = getTypeByName(record.typeName, p);
    return isOk(recType) ?
        // makeOk(makeProcTExp(map((f: Field) => f.te, record.fields), recType.value))) :
        makeOk(makeProcTExp(map((f: Field) => f.te, record.fields), makeUserDefinedNameTExp(record.typeName))) :
        makeFailure(recType.message);
}

function printDebugEnv(env: TEnv, p: Program) {
    if (isEmptyTEnv(env)) {
        console.log("Empty Tenv");
        return;
    }
    let depth = 0
    console.log(`
    Program:\n
    \texps:${map((e: Exp) => e.tag, p.exps)}\n
    \tprogram-define-exps:\n
    \t\tvals:${map((d: DefineExp) => d.val.tag, getDefinitions(p))}\n
    \t\tvars:\n
    \t\t\t:${map((d: DefineExp) => d.var.texp.tag, getDefinitions(p))}\n
    \t\t\t:${map((d: DefineExp) => d.var.var, getDefinitions(p))}\n
    TEnv:\n
    \ttenv:${env.tenv}\n
    \ttexps:${map((t: TExp) => t.tag, env.texps)}\n
    \tvars:${env.vars}\n
    `)
}

// TOODO L51
// Initialize TEnv with:
// * Type of global variables (define expressions at top level of p)
// * Type of implicitly defined procedures for user defined types (define-type expressions in p)
export const initTEnv = (p: Program): TEnv => {
    //Check 2.2.4


    // DefineExp
    const definitons: DefineExp[] = getDefinitions(p);
    const definitonsTExp: TExp[] = map((d: DefineExp) => d.var.texp, definitons);
    const definitionsVars: string[] = map((d: DefineExp) => d.var.var, definitons);

    // UserDefinedNameTExp and Records
    const UDTExpsVars: string[] = map((n: UserDefinedTExp) => n.typeName, getTypeDefinitions(p));
    const UDTExps: UserDefinedNameTExp[] = map(makeUserDefinedNameTExp, UDTExpsVars);
    //records as UDtypNaname
    const recs: Record[] = getRecords(p);
    const recVars: string[] = map((r: Record) => r.typeName, recs);
    const UDTNames = map(makeUserDefinedNameTExp, recVars)

    // generate constructors
    const constructors: Result<ProcTExp[]> = mapResult((r: Record) => makeConstructor(r, p), recs);
    if (isFailure(constructors)) {
        return makeEmptyTEnv();
    }
    const consVars: string[] = map((s: string) => "make-" + s, recVars); // constructors names

    // generate type-predicats
    const preds: ProcTExp[] = map(makePred, UDTExpsVars.concat(recVars));
    const predsVars: string[] = map((s: string) => s + "?", UDTExpsVars.concat(recVars)); // predicats names

    // assemble env
    const envWithDefinitions: TEnv = makeExtendTEnv(definitionsVars, definitonsTExp, makeEmptyTEnv());
    // const envWithUDTExps: TEnv = makeExtendTEnv(UDTExpsVars, UDTExps, envWithDefinitions);
    // const envWithPreds: TEnv = makeExtendTEnv(predsVars, preds, envWithUDTExps);
    const envWithPreds: TEnv = makeExtendTEnv(predsVars, preds, envWithDefinitions);
    const envWithConstructors: TEnv = makeExtendTEnv(consVars, constructors.value, envWithPreds);
    const envWithRecords: TEnv = makeExtendTEnv(recVars, UDTNames, envWithConstructors);
    // printDebugEnv(envWithRecords, p);
    return envWithRecords;

}

// Verify that user defined types and type-case expressions are semantically correct
// =================================================================================
// TODO L51

//1. If a record named R1 is defined below UD1 and also below UD2
//      -then it must have the same fields definition.
//2. Recursive type definitions are possible. For example:


const checkDupRecordsWithDiffFields = (p: Program): boolean => {
    const records = getRecords(p);
    const names: string[] = map((r: Record) => r.typeName, records)
    for (let i = 0; i < names.length; i++) {
        const firstIndex = names.indexOf(names[i])
        if (firstIndex !== i) {
            const fs: (Field[])[] = map((r: Record) => r.fields, [records[firstIndex], records[i]]);
            if (!equals(fs[0], fs[1])) {
                return false;
            }
        }
    }
    return true;
}

const isRecursiveRec = (typeN: UserDefinedTExp, rec: Record): boolean => {
    for (let field of rec.fields) {
        if (equals(field.te, typeN)) {
            return true;
        }
    }
    return false;
}

const isBaseCase = (typeN: UserDefinedTExp, rec: Record): boolean => {
    for (let field of rec.fields) {
        if (!equals(field.te, typeN)) {
            return true;
        }
    }
    return false;
}

const checkRecursiveDefinisions = (p: Program): boolean => {
    const udtp: UserDefinedTExp[] = getTypeDefinitions(p);
    for (let typeN of udtp) {
        for (let rec of typeN.records) {
            if (isRecursiveRec(typeN, rec) && !isBaseCase(typeN, rec))
                return false;
        }
    }
    return true;
}



// TODO: WRITE TESTS
const checkUserDefinedTypes = (p: Program): Result<true> => {
    // If the same type name is defined twice with different definitions
    if (!checkDupRecordsWithDiffFields(p)) {
        return makeFailure("dup");
    }

    // If a recursive type has no base case
    if (!checkRecursiveDefinisions(p)) {
        return makeFailure("recur")
    }
    return makeOk(true);
}

// TODO L51
//1. When a type-case is used on user-defined type UD, we must have exactly one clause for each of the
//      constituent sub-types of the UD type. 
//2. In each of the case clauses, the number of variable declarations that are added must correspond to the
//      number of fields defined in the corresponding Record type. For example

// TODO: WRITE TESTS
const getCaseByRecName = (r: Record, cs: CaseExp[]): CaseExp =>
    cs.filter((c: CaseExp) => c.typeName === r.typeName)[0]

const isValidCase = (r: Record, c: CaseExp): boolean =>
    (c !== undefined) && (r.fields.length === c.varDecls.length)

const testRecsCases = (rs: Record[], cs: CaseExp[]): boolean =>
    all((r: Record) => isValidCase(r, getCaseByRecName(r, cs)), rs)

const checkTypeCase = (tc: TypeCaseExp, p: Program): Result<true> => {
    const cases = tc.cases;
    const typeNameRes = getTypeByName(tc.typeName, p)
    if (isOk(typeNameRes)) {
        if (isUserDefinedTExp(typeNameRes.value)) {
            if (typeNameRes.value.records.length === cases.length) {
                const res = testRecsCases(typeNameRes.value.records, cases);
                if (res) {
                    return makeOk(res)
                }
            }
        } else {
            if (isRecord(typeNameRes.value)) {
                const correctCase: CaseExp[] = tc.cases.filter((c: CaseExp) => c.typeName === tc.typeName)
                if (isValidCase(typeNameRes.value, correctCase[0])) {
                    return makeOk(true);

                }
            }
        }
    }
    return makeFailure("Failure");
}
// Check that all type case expressions have exactly one clause for each constituent subtype 
// (in any order)



// Compute the type of L5 AST exps to TE
// ===============================================
// Compute a Typed-L5 AST exp to a Texp on the basis
// of its structure and the annotations it contains.

// Purpose: Compute the type of a concrete fully-typed expression
export const L51typeofProgram = (concreteExp: string): Result<string> =>
    bind(parseL51(concreteExp), (p: Program) =>
        isOk(checkUserDefinedTypes(p)) ?
            bind(typeofExp(p, initTEnv(p), p), unparseTExp) :
            makeFailure("checkUserDefineTypes no good bro!"))


// For tests on a single expression - wrap the expression in a program
export const L51typeof = (concreteExp: string): Result<string> =>
    L51typeofProgram(`(L51 ${concreteExp})`);

// Purpose: Compute the type of an expression
// Traverse the AST and check the type according to the exp type.
// We assume that all variables and procedures have been explicitly typed in the program.
export const typeofExp = (exp: Parsed, tenv: TEnv, p: Program): Result<TExp> =>
    isNumExp(exp) ? makeOk(typeofNum(exp)) :
        isBoolExp(exp) ? makeOk(typeofBool(exp)) :
            isStrExp(exp) ? makeOk(typeofStr(exp)) :
                isPrimOp(exp) ? typeofPrim(exp) :
                    isVarRef(exp) ? applyTEnv(tenv, exp.var) :
                        isIfExp(exp) ? typeofIf(exp, tenv, p) :
                            isProcExp(exp) ? typeofProc(exp, tenv, p) :
                                isAppExp(exp) ? typeofApp(exp, tenv, p) :
                                    isLetExp(exp) ? typeofLet(exp, tenv, p) :
                                        isLetrecExp(exp) ? typeofLetrec(exp, tenv, p) :
                                            isDefineExp(exp) ? typeofDefine(exp, tenv, p) :
                                                isProgram(exp) ? typeofProgram(exp, tenv, p) :
                                                    isSetExp(exp) ? typeofSet(exp, tenv, p) :
                                                        isLitExp(exp) ? typeofLit(exp, tenv, p) :
                                                            isDefineTypeExp(exp) ? typeofDefineType(exp, tenv, p) :
                                                                isTypeCaseExp(exp) ? typeofTypeCase(exp, tenv, p) :
                                                                    makeFailure(`Unknown type: ${JSON.stringify(exp, null, 2)}`);


// Purpose: Compute the type of a sequence of expressions
// Check all the exps in a sequence - return type of last.
// Pre-conditions: exps is not empty.
export const typeofExps = (exps: Exp[], tenv: TEnv, p: Program): Result<TExp> =>
    isEmpty(rest(exps)) ? typeofExp(first(exps), tenv, p) :
        bind(typeofExp(first(exps), tenv, p), _ => typeofExps(rest(exps), tenv, p));


// a number literal has type num-te
export const typeofNum = (n: NumExp): NumTExp => makeNumTExp();

// a boolean literal has type bool-te
export const typeofBool = (b: BoolExp): BoolTExp => makeBoolTExp();

// a string literal has type str-te
const typeofStr = (s: StrExp): StrTExp => makeStrTExp();

// primitive ops have known proc-te types
const numOpTExp = parseTE('(number * number -> number)');
const numCompTExp = parseTE('(number * number -> boolean)');
const boolOpTExp = parseTE('(boolean * boolean -> boolean)');

// L51 Todo: cons, car, cdr, list
export const typeofPrim = (p: PrimOp): Result<TExp> =>
    (p.op === '+') ? numOpTExp :
        (p.op === '-') ? numOpTExp :
            (p.op === '*') ? numOpTExp :
                (p.op === '/') ? numOpTExp :
                    (p.op === 'and') ? boolOpTExp :
                        (p.op === 'or') ? boolOpTExp :
                            (p.op === '>') ? numCompTExp :
                                (p.op === '<') ? numCompTExp :
                                    (p.op === '=') ? numCompTExp :
                                        // Important to use a different signature for each op with a TVar to avoid capture
                                        (p.op === 'number?') ? parseTE('(T -> boolean)') :
                                            (p.op === 'boolean?') ? parseTE('(T -> boolean)') :
                                                (p.op === 'string?') ? parseTE('(T -> boolean)') :
                                                    (p.op === 'list?') ? parseTE('(T -> boolean)') :
                                                        (p.op === 'pair?') ? parseTE('(T -> boolean)') :
                                                            (p.op === 'symbol?') ? parseTE('(T -> boolean)') :
                                                                (p.op === 'not') ? parseTE('(boolean -> boolean)') :
                                                                    (p.op === 'eq?') ? parseTE('(T1 * T2 -> boolean)') :
                                                                        (p.op === 'string=?') ? parseTE('(T1 * T2 -> boolean)') :
                                                                            (p.op === 'display') ? parseTE('(T -> void)') :
                                                                                (p.op === 'newline') ? parseTE('(Empty -> void)') :
                                                                                    makeFailure(`Primitive not yet implemented: ${p.op}`);

// TODO L51
// Change this definition to account for possibility of subtype expressions between thenTE and altTE
// 
// Purpose: compute the type of an if-exp
// Typing rule:
//   if type<test>(tenv) = boolean
//      type<then>(tenv) = t1
//      type<else>(tenv) = t1
// then type<(if test then else)>(tenv) = t1
export const typeofIf = (ifExp: IfExp, tenv: TEnv, p: Program): Result<TExp> => {
    const testTE = typeofExp(ifExp.test, tenv, p);
    const thenTE = typeofExp(ifExp.then, tenv, p);
    const altTE = typeofExp(ifExp.alt, tenv, p);
    const constraint1 = bind(testTE, testTE => checkEqualType(testTE, makeBoolTExp(), ifExp, p));
    const constraint2 = bind(thenTE, (thenTE: TExp) =>
        bind(altTE, (altTE: TExp) =>
            checkCoverType([thenTE, altTE], p)));
    return bind(constraint1, (_c1) => constraint2);
};

// Purpose: compute the type of a proc-exp
// Typing rule:
// If   type<body>(extend-tenv(x1=t1,...,xn=tn; tenv)) = t
// then type<lambda (x1:t1,...,xn:tn) : t exp)>(tenv) = (t1 * ... * tn -> t)
export const typeofProc = (proc: ProcExp, tenv: TEnv, p: Program): Result<TExp> => {
    const argsTEs = map((vd) => vd.texp, proc.args);
    const extTEnv = makeExtendTEnv(map((vd) => vd.var, proc.args), argsTEs, tenv);
    const constraint1 = bind(typeofExps(proc.body, extTEnv, p), (body: TExp) =>
        checkEqualType(body, proc.returnTE, proc, p));
    return bind(constraint1, (returnTE: TExp) => makeOk(makeProcTExp(argsTEs, returnTE)));
};

// Purpose: compute the type of an app-exp
// Typing rule:
// If   type<rator>(tenv) = (t1*..*tn -> t)
//      type<rand1>(tenv) = t1
//      ...
//      type<randn>(tenv) = tn
// then type<(rator rand1...randn)>(tenv) = t
// We also check the correct number of arguments is passed.
export const typeofApp = (app: AppExp, tenv: TEnv, p: Program): Result<TExp> =>
    bind(typeofExp(app.rator, tenv, p), (ratorTE: TExp) => {
        if (!isProcTExp(ratorTE)) {
            return bind(unparseTExp(ratorTE), (rator: string) =>
                bind(unparse(app), (exp: string) =>
                    makeFailure<TExp>(`Application of non-procedure: ${rator} in ${exp}`)));
        }
        if (app.rands.length !== ratorTE.paramTEs.length) {
            return bind(unparse(app), (exp: string) => makeFailure<TExp>(`Wrong parameter numbers passed to proc: ${exp}`));
        }
        const constraints = zipWithResult((rand, trand) => bind(typeofExp(rand, tenv, p), (typeOfRand: TExp) =>
            checkEqualType(typeOfRand, trand, app, p)),
            app.rands, ratorTE.paramTEs);
        return mapv(constraints, _ => ratorTE.returnTE);
    });

// Purpose: compute the type of a let-exp
// Typing rule:
// If   type<val1>(tenv) = t1
//      ...
//      type<valn>(tenv) = tn
//      type<body>(extend-tenv(var1=t1,..,varn=tn; tenv)) = t
// then type<let ((var1 val1) .. (varn valn)) body>(tenv) = t
export const typeofLet = (exp: LetExp, tenv: TEnv, p: Program): Result<TExp> => {
    const vars = map((b) => b.var.var, exp.bindings);
    const vals = map((b) => b.val, exp.bindings);
    const varTEs = map((b) => b.var.texp, exp.bindings);
    const constraints = zipWithResult((varTE, val) => bind(typeofExp(val, tenv, p), (typeOfVal: TExp) =>
        checkEqualType(varTE, typeOfVal, exp, p)),
        varTEs, vals);
    return bind(constraints, _ => typeofExps(exp.body, makeExtendTEnv(vars, varTEs, tenv), p));
};

// Purpose: compute the type of a letrec-exp
// We make the same assumption as in L4 that letrec only binds proc values.
// Typing rule:
//   (letrec((p1 (lambda (x11 ... x1n1) body1)) ...) body)
//   tenv-body = extend-tenv(p1=(t11*..*t1n1->t1)....; tenv)
//   tenvi = extend-tenv(xi1=ti1,..,xini=tini; tenv-body)
// If   type<body1>(tenv1) = t1
//      ...
//      type<bodyn>(tenvn) = tn
//      type<body>(tenv-body) = t
// then type<(letrec((p1 (lambda (x11 ... x1n1) body1)) ...) body)>(tenv-body) = t
export const typeofLetrec = (exp: LetrecExp, tenv: TEnv, p: Program): Result<TExp> => {
    const ps = map((b) => b.var.var, exp.bindings);
    const procs = map((b) => b.val, exp.bindings);
    if (!allT(isProcExp, procs))
        return makeFailure(`letrec - only support binding of procedures - ${JSON.stringify(exp, null, 2)}`);
    const paramss = map((p) => p.args, procs);
    const bodies = map((p) => p.body, procs);
    const tijs = map((params) => map((p) => p.texp, params), paramss);
    const tis = map((proc) => proc.returnTE, procs);
    const tenvBody = makeExtendTEnv(ps, zipWith((tij, ti) => makeProcTExp(tij, ti), tijs, tis), tenv);
    const tenvIs = zipWith((params, tij) => makeExtendTEnv(map((p) => p.var, params), tij, tenvBody),
        paramss, tijs);
    const types = zipWithResult((bodyI, tenvI) => typeofExps(bodyI, tenvI, p), bodies, tenvIs)
    const constraints = bind(types, (types: TExp[]) =>
        zipWithResult((typeI, ti) => checkEqualType(typeI, ti, exp, p), types, tis));
    return bind(constraints, _ => typeofExps(exp.body, tenvBody, p));
};

// TODO - write the true definition
// Purpose: compute the type of a define
// Typing rule:
//   (define (var : texp) val)
//   tenv-val = extend-tenv(var:texp; tenv)
// If   type<val>(tenv-val) = texp
// then type<(define (var : texp) val)>(tenv) = void
export const typeofDefine = (exp: DefineExp, tenv: TEnv, p: Program): Result<VoidTExp> => {
    const v = exp.var.var;
    const texp = exp.var.texp;
    const val = exp.val;
    const tenvVal = makeExtendTEnv([v], [texp], tenv);
    const constraint = typeofExp(val, tenv, p);
    const constraint2 = bind(constraint, (x) => checkEqualType(x, texp, exp, p));
    return bind(constraint2, (_) => makeOk(makeVoidTExp()));
};

// Purpose: compute the type of a program
// Typing rule:
export const typeofProgram = (exp: Program, tenv: TEnv, p: Program): Result<TExp> =>
    typeofExps(exp.exps, tenv, p);

// TODO L51
// Write the typing rule for DefineType expressions
export const typeofDefineType = (exp: DefineTypeExp, _tenv: TEnv, _p: Program): Result<TExp> =>
    makeOk(makeVoidTExp());


// TODO L51
export const typeofSet = (exp: SetExp, _tenv: TEnv, _p: Program): Result<TExp> => {
    const type1 = applyTEnv(_tenv, exp.var.var);
    const type2 = typeofExp(exp.val, _tenv, _p);
    return isOk(type1) && isOk(type2) ?
        checkEqualType(type1.value, type2.value, exp, _p) ? makeOk(makeVoidTExp()) :
            makeFailure("not equal") :
        makeFailure("one is not ok");
}

// TODO L51
export const typeofLit = (exp: LitExp, _tenv: TEnv, _p: Program): Result<TExp> =>
    makeOk(makeLitTExp());


// TODO: L51
// Purpose: compute the type of a type-case
// Typing rule:
// For all user-defined-type id
//         with component records record_1 ... record_n
//         with fields (field_ij) (i in [1...n], j in [1..R_i])
//         val CExp
//         body_i for i in [1..n] sequences of CExp
//   ( type-case id val (record_1 (field_11 ... field_1r1) body_1)...  )
//  TODO
export const typeofTypeCase = (exp: TypeCaseExp, tenv: TEnv, p: Program): Result<TExp> => {
    const newEnv: Box<TEnv> = makeBox(tenv);
    const vars: (VarDecl[])[] = map((c: CaseExp) => c.varDecls, exp.cases);
    const recordsRes: Result<UDTExp[]> = mapResult((x: CaseExp) => getTypeByName(x.typeName, p), exp.cases);
    if (isOk(recordsRes)) {
        const records = recordsRes.value;
        records.forEach((rec: UDTExp, index: number) => {
            if (isRecord(rec)) {
                const fieldTypes: TExp[] = map((f: Field) => f.te, rec.fields);
                vars.forEach(
                    (vs: VarDecl[], index: number) =>
                        setBox(newEnv, makeExtendTEnv(map((v: VarDecl) => v.var, vars[index]), fieldTypes, unbox(newEnv))))
            }
        }
        )
    }
    const returnTypes = mapResult((x: CaseExp) => typeofExps(x.body, unbox(newEnv), p), exp.cases);
    return isOk(checkTypeCase(exp, p)) ? bind(returnTypes, (exps: TExp[]) => checkCoverType(exps, p)) :
        makeFailure("Error: checkTypeCase in typeofTypeCase")
}
