import { Arg, Command } from "../args.ts";
import { info } from "../../util/info.ts";

const args: Arg = {
  name: "Execute",
  help: "Run cached binary",
  short: "x",
  long: "execute",
};

function run(data: string) {
  info.info("TODO: Implement");
  info.info("Passed " + data);
}

export function get() {
  return new Command(args, run);
}
