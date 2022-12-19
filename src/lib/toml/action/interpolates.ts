import { globals } from "globals";

import { Action } from "./types.ts";

function interpolateAction(action: Action) {
  action = interpolateVersion(action);
  action = interpolateBinloc(action);
  return action;
}

function interpolateVersion(action: Action) {
  let version;
  if (action.provides.dynamic) {
    version = globals.command.program_version
      ? globals.command.program_version
      : action.provides.default;
  } else {
    version = action.provides.default;
  }

  globals.parse.interpolated_version = version;

  action.provides.source = action.provides.source
    .toString()
    .split("{{version}}")
    .join(version);

  action.provides.install.cmd = action.provides.install.cmd
    .split("{{version}}")
    .join(version);

  action.provides.install.test = action.provides.install.test
    .split("{{version}}")
    .join(version);

  return action;
}

function interpolateBinloc(action: Action) {
  const progloc =
    globals.static.wd_install_location +
    `/${action.provides.name}/${globals.parse.interpolated_version}`;

  globals.parse.interpolated_this_program = progloc;

  globals.parse.interpolated_sourceloc = progloc + "/raw";
  globals.parse.interpolated_binloc = progloc + "/bin";

  action.provides.install.cmd = action.provides.install.cmd
    .split("{{binloc}}")
    .join(globals.parse.interpolated_binloc);

  action.provides.install.test = action.provides.install.test
    .split("{{binloc}}")
    .join(globals.parse.interpolated_binloc);

  return action;
}

export { interpolateAction };
