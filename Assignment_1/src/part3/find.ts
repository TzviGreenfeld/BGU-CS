import { ok } from "assert";
import { findSourceMap } from "module";
import { Result, makeFailure, makeOk, bind, either, isOk } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}
// a
export const findResult = <T>(pred: (x: T) => boolean, arr: T[] ) : Result<T> =>{
    if (arr.length === 0){
        return makeFailure("No such element exists");
    }else if (pred(arr[0])){
        return makeOk(arr[0]);
    }else{
        findResult(pred, arr.slice(1))
    }
}

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

// b
export const returnSquaredIfFoundEven_v2 = (nums: number[]) : Result<number> =>{
    const res : Result<number> = findResult(x => x%2 === 0, nums);
    return bind(res, x => makeOk(x*x));

}

// c
export const returnSquaredIfFoundEven_v3 = (nums: number[]) : number =>{
    const res : Result<number> = findResult(x => x % 2 === 0, nums);
    return either(res, x => x*x, x => -1);
}
