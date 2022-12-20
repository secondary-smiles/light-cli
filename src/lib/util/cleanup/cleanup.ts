import { globals } from "globals";

import { Action } from "lib/toml/action/types.ts";
import { pathExists } from "lib/file/exists.ts";

async function cleanupInstall(action: Action) {
  const wd_location = `${globals.static.wd_install_location}/${action.provides.name}`;
  if (!(await pathExists(wd_location))) return;

  await Deno.remove(wd_location, { recursive: true });
}

export { cleanupInstall };
