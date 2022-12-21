import { globals } from "globals";
import { logger } from "logger";

import { ensureDir } from "fs/mod.ts";

import { Action } from "lib/toml/action/types.ts";

import { fetchSource } from "lib/remote/net/fetchSource.ts";
import { decompress } from "lib/file/decompress.ts";
import { runAsBash } from "./shell/bash.ts";
import { symlink } from "lib/file/symlink.ts";
import { cleanupInstall } from "lib/install/cleanup/cleanup.ts";

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

  logger.load(`compiling and installing '${action.provides.name}'`);
  // Run install cmd
  await runAsBash(
    globals.parse.interpolated_this_program + "/raw/decompress",
    action.provides.install.cmd,
    "install script"
  );

  logger.load(`testing '${action.provides.name}'`);
  // run test cmd
  await runAsBash(
    globals.parse.interpolated_binloc,
    action.provides.install.test,
    "test script"
  );

  logger.stopLoad();

  // Move to final binloc
  await ensureDir(globals.parse.final_bin_location);
  await Deno.copyFile(
    `${globals.parse.interpolated_binloc}${action.provides.name}`,
    `${globals.parse.final_bin_location}/${action.provides.name}`
  );

  // Symlink to bin
  symlink(
    `${globals.parse.final_bin_location}/${action.provides.name}`,
    `${globals.static.bin_location}/${action.provides.name}`
  );

  // Cleanup
  await cleanupInstall(action);
}

export { install };
