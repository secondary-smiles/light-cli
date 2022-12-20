import { bold, brightYellow, red, blue, gray } from "fmt/colors.ts";

import { globals } from "globals";

interface LoaderData {
  loading: boolean;
  icons: string[];
  index: number;
  currentLoader: number;
  message: string;
}

const escapeCodes = {
  clearLine: `\r\x1b[K`,
  lineUp: `\x1b[1F`,

  stderrWrite(message: string) {
    Deno.stderr.writeSync(new TextEncoder().encode(message));
  },

  stdoutWrite(message: string) {
    Deno.stdout.writeSync(new TextEncoder().encode(message));
  },
};

class Logger {
  prefix: string;
  private loaderData: LoaderData;

  constructor(prefix = "") {
    this.prefix = bold(prefix);

    this.loaderData = {
      loading: false,
      currentLoader: NaN,
      icons: ["⢿", "⣻", "⣽", "⣾", "⣷", "⣯", "⣟", "⡿"],
      index: 0,
      message: "",
    };
  }

  log(...message: any) {
    if (globals.command.silent) return;
    this.stopLoad();

    console.log(...message);
  }

  verbose(...message: any) {
    if (globals.command.verbose) {
      this.stopLoad();
      console.log(...message);
    }
  }

  notice(message: any) {
    if (globals.command.silent) return;
    this.stopLoad();

    console.info(blue(this.prefix + message));
  }

  warn(message: any) {
    if (globals.command.silent) return;
    this.stopLoad();

    console.warn(brightYellow(this.prefix + message));
  }

  error(message: any) {
    if (globals.command.silent) return;
    this.stopLoad();

    console.error(red(this.prefix + message));
  }

  load(message = this.loaderData.message, speed = 50) {
    if (globals.command.silent || globals.command.verbose) return;
    this.stopLoad();

    this.loaderData.loading = true;
    this.loaderData.message = message;
    this.loaderData.currentLoader = setInterval(() => {
      this.processLoad();
    }, speed);
  }

  stopLoad() {
    if (this.loaderData.loading) {
      escapeCodes.stderrWrite(escapeCodes.clearLine);
      clearInterval(this.loaderData.currentLoader);
      this.loaderData.loading = false;
    }
  }

  clear(lines: number) {
    if (globals.command.silent) return;
    this.stopLoad();

    for (let i = 0; i < lines; i++) {
      escapeCodes.stdoutWrite(escapeCodes.clearLine);
      escapeCodes.stdoutWrite(escapeCodes.lineUp);
    }
    escapeCodes.stdoutWrite(escapeCodes.clearLine);
  }

  private processLoad() {
    const icon = this.loaderData.icons[this.loaderData.index];
    const message = `${escapeCodes.clearLine}${icon} ${gray(
      `${this.loaderData.message}..`
    )}`;

    escapeCodes.stderrWrite(message);
    this.loaderData.index =
      (this.loaderData.index + 1) % this.loaderData.icons.length;
  }
}

export { Logger };
