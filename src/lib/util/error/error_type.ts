export default class Problem extends Error {
    code: number;

    constructor(message: string, code: number=1) {
        super(message);
        Object.setPrototypeOf(this, Problem.prototype);

        this.code = code;
    }
}