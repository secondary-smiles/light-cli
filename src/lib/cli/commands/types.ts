interface Arg {
  name: string;
  short: string;
  long: string;
  help: string;
}

class Command {
  arg: Arg;

  run: Function;

  constructor(arg: Arg, run: Function) {
    this.arg = arg;
    this.run = run;
  }
}

export { Command };
export type { Arg };
