import { ProgramAction } from "./toml.ts";
import { info } from "../util/info.ts";
import { COMMANDS, INTERPOLATES } from "../../globals.ts";

function interpolateVersion(toml: ProgramAction) {
  // Conditions
  // dyn_ver && custom version set custom
  // dyn_ver && !custom version set default
  // !dyn_ver set default

  info.warn(toml)
  if (toml.dyn_version && COMMANDS.version) {
    INTERPOLATES.version = COMMANDS.version.toString();
  } else {
    INTERPOLATES.version = toml.def_ver;
  }

  info.info(INTERPOLATES.version)
}

export { interpolateVersion };
