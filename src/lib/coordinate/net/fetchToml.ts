import { globals } from "globals";
import { logger } from "logger";

import { fetchToml as netFetchToml } from "lib/remote/net/fetchToml.ts";
import { fetchToml as coreFetchToml } from "lib/local/net/fetchToml.ts";

async function fetchToml(source: string) {
  logger.load(`fetching ${source}`);
  if (globals.command.core) {
    const data = await coreFetchToml(source);
    logger.stopLoad();
    return data;
  } else {
    const data = await netFetchToml(source);
    logger.stopLoad();
    return data;
  }
}

export { fetchToml };
