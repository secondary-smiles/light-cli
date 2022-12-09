import { blue, yellow, red, bold, gray } from "fmt/colors.ts";

const info = {
  _spinnerChars: ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"],
  _spinnerIndex: 0,
  _loader: NaN,
  _loaderData: "",

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
    this._loaderData = data;
    this.stopLoad();

    this._loader = setInterval(() => {
      this._load(data);
    }, speed);
  },

  resumeLoad() {
    this.load(this._loaderData);
  },

  _load(data: any) {
    const clear = `\r\x1b[K`;
    const icon = this._spinnerChars[this._spinnerIndex];
    const message = `${clear}${bold(icon)} ${gray(data)}${gray("..")}`;

    Deno.stderr.writeSync(new TextEncoder().encode(message));

    this._spinnerIndex = (this._spinnerIndex + 1) % this._spinnerChars.length;
  },

  stopLoad() {
    if (!isNaN(this._loader)) {
      const clear = `\r\x1b[K`;
      Deno.stderr.writeSync(new TextEncoder().encode(clear));
      clearInterval(this._loader);
    }
  },

  clearLines(lines: number) {
    this.stopLoad();
    for (let i = 0; i < lines; i++) {
      const clear = `\r\x1b[2K\r\x1b[1F`;
      // Deno.stderr.writeSync(new TextEncoder().encode(clear));
      Deno.stdout.writeSync(new TextEncoder().encode(clear));
    }
    this.resumeLoad();
  },
};

export { info };
