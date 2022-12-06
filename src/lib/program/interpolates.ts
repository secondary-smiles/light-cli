import { ProgramAction } from "./toml.ts";
import { COMMANDS, INTERPOLATES } from "../../globals.ts";
import {genBinloc} from "../util/path.ts";
import {ProgramArgs} from "../cli/parseArgs.ts";

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

function interpolateBinloc(toml: ProgramAction, program: ProgramArgs) {
  // Binloc is the location of the binary. Probably something like `light/{{source}}/bin/{{program_name}}
  // TODO: Create resolveBinloc function
  INTERPOLATES.binloc = genBinloc(toml, program);

  toml.source = toml.source.split("{{binloc}}").join(INTERPOLATES.binloc);

  toml.install.cmd = toml.install.cmd
    .split("{{binloc}}")
    .join(INTERPOLATES.binloc);

  toml.install.test = toml.install.test
    .split("{{binloc}}")
    .join(INTERPOLATES.binloc);

  return toml;
}

export { interpolateVersion, interpolateBinloc };
