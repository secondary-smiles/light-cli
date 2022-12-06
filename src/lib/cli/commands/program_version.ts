import { Arg, Command } from "../args.ts";
import { COMMANDS } from "../../../globals.ts";
import { getSemver, Semver } from "../../util/semver.ts";
import {error} from "../../util/error.ts";

const args: Arg = {
  name: "Program Version",
  help: "Specify program version to look for when downloading",
  short: "v",
  long: "version",
};

function run(data: string) {
  if (typeof data !== 'string') {
    error(new Error("invalid version passed"))
  }

  COMMANDS.version = getSemver(data);
}

export function get() {
  return new Command(args, run);
}
