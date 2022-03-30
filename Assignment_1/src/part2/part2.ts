import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
export const countLetters= (s: string) => {
    R.reduce((chars, currChar) => {
        if (currChar in chars){
            chars[currChar]++;
        }
        else {
            chars[currChar] = 1;
        }
        return chars;
    }, Object.create({}), stringToArray(s))
}

/* Question 2 */
export const isPaired: (s: string) => boolean = undefined

/* Question 3 */
interface WordTree {
    root: string;
    children: WordTree[];
}

export const treeToSentence = (t: WordTree): string => undefined

