import { Arg, Command } from "lib/cli/commands/types.ts";
import { globals } from "globals";

const args: Arg = {
  name: "Verbose",
  help: "Print verbose output",
  long: "",
  short: "v",
};

function run() {
  globals.command.silent = false;
  globals.command.verbose = true;
}

export function get() {
  return new Command(args, run);
}
