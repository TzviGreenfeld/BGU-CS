import * as R from "../../src/lib/result";
import * as F from "../../src/part3/find";

describe("Find", () => {
    describe("findResult", () => {
        it("returns a Failure when no element was found", () => {
            const result = F.findResult(x => x.length > 3, ["dog", "cat", "rat"]);
            expect(result).toSatisfy(R.isFailure);
        });

        it("returns an Ok when an element was found", () => {
            const result = F.findResult(x => x.length > 3, ["raccoon", "ostrich", "slug"]);
            expect(result).toSatisfy(R.isOk);
        });
    });

    describe("returnSquaredIfFoundEven", () => {
        it("returns an Ok of the first even number squared in v2", () => {
            const result = F.returnSquaredIfFoundEven_v2([1, 2, 3]);
            expect(result).toEqual(R.makeOk(4));
        });

        it("return a Failure if no even numbers are in the array in v2", () => {
           const result = F.returnSquaredIfFoundEven_v2([1, 3, 5]);
           expect(result).toSatisfy(R.isFailure);
        });

        it("returns the first even number squared in v3", () => {
            expect(F.returnSquaredIfFoundEven_v3([1, 2, 3])).toEqual(4);
        });

        it("returns -1 if no even numbers are in the array in v3", () => {
            expect(F.returnSquaredIfFoundEven_v3([1, 3, 5])).toEqual(-1);
        });
    });
});