import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
// by using indexOf we get the first occurence of an item
export const countLetters: (s: string) => {
    // get unique values
    const uni = stringToArray(s).filter(letter: string, index: number)
}

/* Question 2 */
// export const isPaired: (s: string) => boolean = undefined

/* Question 3 */
interface WordTree {
    root: string;
    children: WordTree[];
}

// export const treeToSentence = (t: WordTree): string => undefined

console.log(countLetters("aabbccddee"))