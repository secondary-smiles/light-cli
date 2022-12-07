import { blue, yellow, red, bold } from "fmt/colors.ts";

const info = {
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
};

export { info };
