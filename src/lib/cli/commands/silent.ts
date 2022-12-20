import { Arg, Command } from "lib/cli/commands/types.ts";
import { globals } from "globals";

const args: Arg = {
  name: "Silent",
  help: "Silence program output. Will implicitly call 'yes' command.",
  long: "silent",
  short: "s",
};

function run() {
  // Not allowed to have both at the same time, whatever gets executed last has priority
  globals.command.verbose = false;
  globals.command.silent = true;

  globals.command.yes = true;

  globals.parse.run_output = "null";
}

export function get() {
  return new Command(args, run);
}
