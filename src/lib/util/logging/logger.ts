import { bold, brightYellow, red, blue } from "fmt/colors.ts";

class Logger {
  prefix: string;

  constructor(prefix = "") {
    this.prefix = bold(prefix)
  }

  log(message: string) {
    //TODO: Check verbosity
    console.log(message);
  }

  notice(message: string) {
    console.info(blue(this.prefix + message));
  }

  warn(message: string) {
    console.warn(brightYellow(this.prefix + message));
  }

  error(message: string) {
    console.error(red(this.prefix + message));
  }
}

export { Logger };
