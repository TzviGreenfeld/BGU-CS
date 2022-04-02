import exp = require("constants");
import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
// export const countLetters = (s: string): Map<string, number> => {

// }


//     // R.reduce((chars, currChar) => {
//     //     if (currChar in chars) {
//     //         chars[currChar]++;
//     //     }
//     //     else {
//     //         chars[currChar] = 1;
//     //     }
//     //     return chars;
//     // }, Object.create({}), stringToArray(s))
// }

/* Question 2 */
/* algortihm:


*/
export const getCloser = (par: string): string => {
    if (par === '{')
        return '}';
    else if (par === '[')
        return ']';
    else if (par === '(')
        return ')';
    else
        return ' ';
}

export const isPaired = (s: string): boolean => {
    console.log(s);
    const expr = stringToArray(s);
    if (expr.length === 0){
        console.log("len 0");
        return true;
    }
    else if (expr.length % 2 === 1){
        console.log("odd");
        return false;
    }
    else if (['}', ']', ')'].includes(expr[0])){
        console.log("first closing");
        return false;
    }


    const parentheis: Array<string> = stringToArray("[]{}()");
    const relevantExp: string[] = expr.filter(c => parentheis.includes(c));
    const currClosing: number = relevantExp.indexOf(getCloser(relevantExp[0]));



    const firstHalf = relevantExp.join("").substring(1, currClosing);

    if (currClosing <= relevantExp.length - 1) {
        const secondHalf = relevantExp.join("").substring(currClosing, relevantExp.length - 1);
        return (isPaired(firstHalf) && isPaired(secondHalf));
    } else {
        return (isPaired(firstHalf));
    }

}

// /* Question 3 */
// interface WordTree {
//     root: string;
//     children: WordTree[];
// }

// export const treeToSentence = (t: WordTree): string => undefined

console.log(isPaired("({[]})"));