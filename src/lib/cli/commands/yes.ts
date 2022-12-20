import { Arg, Command } from "lib/cli/commands/types.ts";
import { globals } from "globals";

const args: Arg = {
  name: "Yes",
  help: "Automatically answer 'yes' to all prompts",
  long: "yes",
  short: "y",
};

function run() {
  globals.command.yes = true;
}

export function get() {
  return new Command(args, run);
}
