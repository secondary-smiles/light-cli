import { Arg, Command } from "../args.ts";
import { info } from "../../util/info.ts";
import {COMMANDS} from "../../../globals.ts";

const args: Arg = {
  name: "Destroy",
  help: "Don't cache program after running it",
  short: "d",
  long: "destroy",
};

function run() {
  COMMANDS.destroy = true;
}

export function get() {
  return new Command(args, run);
}
