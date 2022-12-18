import { globals } from "globals";

import { fetchToml as netFetchToml } from "lib/remote/net/fetchToml.ts";

async function fetchToml(source: string) {
  if (globals.command.core) {
  } else {
    return await netFetchToml(source);
  }
}

export { fetchToml };
