import { bold, gray, brightGreen } from "fmt/colors.ts";
import { Semver } from "./lib/util/semver.ts";

// TODO: Comments explaining fields
export const VERSION = "0.0.1";
export const NAME = "light";
export const ABOUT = "Placeholder about text";
export const PREFIX = "+";
export const USAGE = `${NAME} [${bold("FLAGS")}] ${brightGreen(PREFIX)}<${bold(
  "SOURCE"
)}> <${gray("SOURCE PROGRAM")}> [${gray("SOURCE PROGRAM FLAGS")}]`;
export const PROVIDES = "provides.toml";
export const ACTION = "action.toml";
export const MAXLENGTH = 41

//FIXME: TIMEOUT Holding entire program
export const TIMEOUT = 6000;

export const INTERPOLATES = {
  version: "",
  baseloc: "",
  sourceloc: "",
  binloc: "",
  final_binloc: "",
};

interface Commands {
  destroy: boolean;
  version: null | Semver;
}

export const COMMANDS: Commands = {
  destroy: false,
  version: null,
};
