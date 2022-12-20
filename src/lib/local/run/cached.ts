import { globals } from "globals";
import { logger } from "logger";

import { Action } from "lib/toml/action/types.ts";
import { Program } from "lib/cli/parse/types.ts";
import { pathExists } from "lib/file/exists.ts";

async function isCached(program: Program, action: Action) {
  const dirloc = `${Deno.env.get("HOME")}/.light/${program.program.source}/${
    action.provides.name
  }`;
  logger.verbose(dirloc);

  globals.parse.final_bin_location =
    dirloc + "/" + globals.parse.interpolated_version;

  if (!(await pathExists(dirloc))) {
    return false;
  }

  for await (const item of Deno.readDir(dirloc)) {
    if (item.isDirectory /*TODO: && nameIsSemver(item.name)*/) {
      // TODO: Check version
      for await (const subItem of Deno.readDir(dirloc + "/" + item.name)) {
        if (subItem.isFile && subItem.name == action.provides.name) {
          return true;
        }
      }
    }
  }

  return false;
}

export { isCached };
