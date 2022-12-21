import { globals } from "globals";
import { logger } from "logger";

import { Action } from "lib/toml/action/types.ts";
import { pathExists } from "lib/file/exists.ts";
import { Program } from "lib/cli/parse/types.ts";

async function cleanupInstall(action: Action) {
  // Standard cleanup
  const wd_location = `${globals.static.wd_install_location}/${action.provides.name}`;
  await deletePath(wd_location);
}

async function cleanupRun(action: Action) {
  if (globals.command.destroy) {
    const sourcelocation = `${globals.static.home}/${action.provides.name}`;
    await deletePath(sourcelocation);

    const linklocation = `${globals.static.bin_location}/${action.provides.name}`;
    await deletePath(linklocation);
  }
}

async function deletePath(path: string) {
  logger.verbose(path);
  // if (!(await pathExists(path))) return;
  await Deno.remove(path, { recursive: true });
}

export { cleanupInstall, cleanupRun };
