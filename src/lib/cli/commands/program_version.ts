import { Arg, Command } from "../args.ts";
import { COMMANDS, INTERPOLATES } from "../../../globals.ts";
import { getSemver } from "../../util/semver.ts";
import { error } from "../../util/error.ts";

const args: Arg = {
  name: "Program Version",
  help: "Specify program version to look for when downloading and running",
  short: "v",
  long: "version",
};

function run(data: string) {
  if (typeof data !== "string") {
    error(new Error("invalid version passed"));
  }

  const version = getSemver(data);
  if (version instanceof Error) {
    error(version);
  }

  COMMANDS.version = version;
  if (!INTERPOLATES.version) {
    INTERPOLATES.version = COMMANDS.version.toString();
  }
}

export function get() {
  return new Command(args, run);
}
