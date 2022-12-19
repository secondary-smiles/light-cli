import { Action } from "lib/toml/action/types.ts";

import { fetchSource } from "lib/remote/net/fetchSource.ts";
import {decompress} from "lib/file/decompress.ts";

async function install(action: Action) {
  // Download source
  await fetchSource(action.provides.source);
  // Unzip source
  await decompress()
  // Run install cmd
  // run test cmd
  // Move to final binloc
}

export { install };
