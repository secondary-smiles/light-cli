import { bold, brightYellow, red, blue, gray } from "fmt/colors.ts";

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

  log(message: any) {
    this.stopLoad();

    //TODO: Check verbosity
    console.log(message);
  }

  notice(message: any) {
    this.stopLoad();

    console.info(blue(this.prefix + message));
  }

  warn(message: any) {
    this.stopLoad();

    console.warn(brightYellow(this.prefix + message));
  }

  error(message: any) {
    this.stopLoad();

    console.error(red(this.prefix + message));
  }

  load(message = this.loaderData.message, speed = 50) {
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
    this.stopLoad();

    for (let i = 0; i < lines; i++) {
      escapeCodes.stdoutWrite(escapeCodes.clearLine);
      escapeCodes.stdoutWrite(escapeCodes.lineUp);
    }
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
