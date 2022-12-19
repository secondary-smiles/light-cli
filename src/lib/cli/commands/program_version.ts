import { Arg, Command } from "lib/cli/commands/types.ts";
import { logger } from "logger";
import { globals } from "globals";

const args: Arg = {
  name: "Program Version",
  help: "Manually select program version, if available",
  long: "version",
  short: "",
};

function run(data: string) {
  globals.command.program_version = data;
}

export function get() {
  return new Command(args, run);
}
