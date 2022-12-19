import { Arg, Command } from "lib/cli/commands/types.ts";
import { logger } from "logger";
import { globals } from "globals";

const args: Arg = {
  name: "Version",
  help: "Prints program version and exits",
  long: "",
  short: "V",
};

function run() {
  logger.log(`light ${globals.static.app_version}`);
}

export function get() {
  return new Command(args, run, false);
}
