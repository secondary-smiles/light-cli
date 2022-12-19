import { globals } from "globals";
import { logger } from "logger";

import { Action } from "lib/toml/action/types.ts";
import { Program } from "lib/cli/parse/types.ts";
import { pathExists } from "lib/file/exists.ts";

async function isCached(program: Program, action: Action) {
  const dirloc = `${globals.static.wd_location}/${program.program.source}/${action.provides.name}`;
  logger.verbose(dirloc);

  if (!(await pathExists(dirloc))) {
    return false;
  }

  for await (const item of Deno.readDir(dirloc)) {
    if (item.isDirectory /*TODO: && nameIsSemver(item.name)*/) {
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
