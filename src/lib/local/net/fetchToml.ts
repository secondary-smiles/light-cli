import { globals } from "globals";
import { logger } from "logger";
import {serializeToToml} from "lib/toml/util/serialize.ts";

async function fetchToml(source: string) {
  // Source won't end with `toml` if it's the provides call
  if (!source.endsWith('.toml')) {
    source += "/provides.toml";
  }

  const dirLoc = globals.static.core_location + `/${source}`;

  logger.log(dirLoc)

  const data = await Deno.readTextFile(dirLoc);
  return serializeToToml(data);
}

export { fetchToml };
