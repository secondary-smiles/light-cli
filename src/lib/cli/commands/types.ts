interface Arg {
  name: string;
  short: string;
  long: string;
  help: string;
}

class Command {
  arg: Arg;

  run: Function;
  needsProgram: boolean;

  constructor(arg: Arg, run: Function, needProgram=true) {
    this.arg = arg;
    this.needsProgram = needProgram;
    this.run = run;
  }
}

export { Command };
export type { Arg };
