import { ProgramAction } from "./toml.ts";
import { COMMANDS, INTERPOLATES } from "../../globals.ts";

function interpolateVersion(toml: ProgramAction) {
  // Conditions
  // dyn_ver && custom version set custom
  // dyn_ver && !custom version set default
  // !dyn_ver set default

  if (toml.dyn_version && COMMANDS.version) {
    INTERPOLATES.version = COMMANDS.version.toString();
  } else {
    INTERPOLATES.version = toml.def_ver;
  }

  toml.source = toml.source.split("{{version}}").join(INTERPOLATES.version);

  toml.install.cmd = toml.install.cmd
    .split("{{version}}")
    .join(INTERPOLATES.version);

  toml.install.test = toml.install.test
    .split("{{version}}")
    .join(INTERPOLATES.version);

  return toml;
}

export { interpolateVersion };
