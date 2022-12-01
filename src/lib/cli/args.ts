export interface Arg {
    name: string;
    short: string;
    long: string;
    help: string;
}

export class Command {
    arg: Arg;

    run: Function;

    needKeyword: boolean

    constructor(arg: Arg, run: Function, needKeyword: boolean) {
        this.arg = arg;
        this.run = run;
        this.needKeyword = needKeyword;
    }
}