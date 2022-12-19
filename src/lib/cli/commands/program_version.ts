import { globals } from "globals";

import { Problem } from "error";
import { Arg, Command } from "lib/cli/commands/types.ts";

const args: Arg = {
  name: "Program Version",
  help: "Manually select program version, if available",
  long: "version",
  short: "",
};

function run(data: string) {
  if (typeof data == "string") {
    globals.command.program_version = data;
  } else {
    throw new Problem(`${data} is not a valid semver`);
  }
}

export function get() {
  return new Command(args, run);
}
