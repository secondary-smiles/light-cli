import { blue, yellow, red, bold } from "fmt/colors.ts";

const info = {
  spinnerChars: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
  spinnerIndex: 0,
  loader: NaN,

  log(data: any) {
    console.log(data);
  },

  info(data: any) {
    console.info(bold(blue("info") + ": "), data);
  },

  warn(data: any) {
    console.warn(bold(yellow("warn") + ": "), data);
  },

  error(data: any) {
    console.warn(bold(red("error") + ": "), data);
  },

  load(data: any, speed = 50) {
    this.stopLoad();

    this.loader = setInterval(() => {
      this._load(data);
    }, speed);
  },

  _load(data: any) {
    const clear = `\r\x1b[K`;
    const message = `${clear}${this.spinnerChars[this.spinnerIndex]} ${data}..`;

    Deno.stderr.writeSync(new TextEncoder().encode(message))

    this.spinnerIndex = (this.spinnerIndex + 1) % this.spinnerChars.length;
  },

  stopLoad() {
    if (!isNaN(this.loader)) {
      const clear = `\r\x1b[K`;
      Deno.stderr.writeSync(new TextEncoder().encode(clear));
      clearInterval(this.loader);
    }
  }
};

export { info };
