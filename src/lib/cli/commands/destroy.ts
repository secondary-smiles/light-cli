import { Arg, Command } from "../args.ts";
import { info } from "../../util/info.ts";

const args: Arg = {
  name: "Destroy",
  help: "Don't cache program after running it",
  short: "d",
  long: "destroy",
};

function run() {
  info.info("TODO: Implement");
}

export function get() {
  return new Command(args, run);
}
