import { Arg, Command } from "lib/cli/commands/types.ts";
import { globals } from "globals";

const args: Arg = {
  name: "Core",
  help: "Install from the core repository if available",
  long: "core",
  short: "c",
};

function run() {
  globals.command.core = true;
}

export function get() {
  return new Command(args, run);
}
