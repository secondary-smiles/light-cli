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

  action.provides.source = new URL(
    action.provides.source.toString().split("{{version}}").join(version)
  );

  action.provides.install.cmd = action.provides.install.cmd
    .split("{{version}}")
    .join(version);

  action.provides.install.test = action.provides.install.test
    .split("{{version}}")
    .join(version);

  return action;
}

function interpolateBinloc(action: Action) {
  const binloc =
    globals.static.wd_install_location +
    `/${action.provides.name}/${globals.parse.interpolated_version}/bin`;

  globals.parse.interpolated_binloc = binloc;

  action.provides.install.cmd = action.provides.install.cmd
    .split("{{binloc}}")
    .join(binloc);

  action.provides.install.test = action.provides.install.test
    .split("{{binloc}}")
    .join(binloc);

  return action;
}

export { interpolateAction };
