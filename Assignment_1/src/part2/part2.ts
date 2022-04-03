import exp = require("constants");
import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
export const countLetters : (s: string) => {[key: string]: number} = (s: string) => R.countBy(R.toLower)(stringToArray(s).reduce(x => x != " "));

/* Question 2 */
const conditionalPushPop = (stack: string[], opener:string, closer: string) : string[] => {
    if(R.isEmpty(stack)){
        return [closer];
    } else if (stack[0] === opener){
        return R.tail(stack);
    } else {
        return R.prepend(closer, stack);
    }
    
}

const getOpener = (par: string): string => {
    if (par === '}')
        return '{';
    else if (par === ']')
        return '[';
    else if (par === ')')
        return '(';
    else
        return ' ';
}


const functionalStack = (stack: string[], char: string): string[] =>{
    if (['(', '[', '{'].includes(char)){
        return R.prepend(char, stack);
    } else if (['}', ']', ')'].includes(char)){
        return conditionalPushPop(stack, getOpener(char), char);
    } else {
        return stack;
    } 

}

export const isPaired : (s: string) => boolean = R.pipe(
    stringToArray,
    R.reduce(functionalStack, []),
    R.isEmpty,
)

/* Question 3 */
interface WordTree {
    root: string;
    children: WordTree[];
}


export const treeToSentence = (t: WordTree): string => {
    return R.reduce((x, y) => x.concat(y.root), [t.root], t.children).join(" ")
}


