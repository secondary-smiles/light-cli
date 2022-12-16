import { Arg, Command } from "lib/cli/commands/types.ts";
import { logger } from "logger";
import { globals } from "globals";

const args: Arg = {
  name: "Version",
  help: "Prints program version and exits",
  long: "",
  short: "V",
};

function run(): never {
  logger.log(`light ${globals.static.version}`);

  Deno.exit(0);
}

export function get() {
  return new Command(args, run, false);
}
