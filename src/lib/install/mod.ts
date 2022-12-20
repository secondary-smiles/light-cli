import { globals } from "globals";

import { ensureDir } from "fs/mod.ts";

import { Action } from "lib/toml/action/types.ts";

import { fetchSource } from "lib/remote/net/fetchSource.ts";
import { decompress } from "lib/file/decompress.ts";
import { runAsBash } from "./shell/bash.ts";

async function install(action: Action) {
  // Download source
  await fetchSource(action.provides.source);
  // Unzip source
  await decompress(
    globals.parse.interpolated_sourceloc + "/source",
    globals.parse.interpolated_this_program + "/raw/decompress"
  );

  // Ensure binloc exists
  ensureDir(globals.parse.interpolated_binloc);

  // Run install cmd
  await runAsBash(
    globals.parse.interpolated_this_program + "/raw/decompress",
    action.provides.install.cmd
  );

  // run test cmd
  await runAsBash(
    globals.parse.interpolated_binloc,
    action.provides.install.test
  );

  // Move to final binloc
}

export { install };
