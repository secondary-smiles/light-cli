import { logger } from "logger";

import { preprocessUrl } from "./url.ts";

async function fetchSource(source: string) {
  const url = preprocessUrl(source);
  logger.verbose(url);
}

export { fetchSource };
