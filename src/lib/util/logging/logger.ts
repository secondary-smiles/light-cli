import { brightYellow, red } from "fmt/colors.ts";

class Logger {
  log(message: string) {
    //TODO: Check verbosity
    console.log(message);
  }

  warn(message: string) {
    console.warn(brightYellow(message));
  }

  error(message: string) {
    console.error(red(message));
  }
}

export { Logger };
