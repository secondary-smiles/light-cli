import { Problem } from "error";
import { logger } from "logger";
import { globals } from "globals";

import { serializeToToml } from "lib/toml/util/serialize.ts";

import { preprocessUrl } from "./url.ts";

async function fetchToml(source: string) {
  const url = preprocessUrl(source);
  logger.verbose(url);

  globals.parse.current_source = url.hostname;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Problem(
      `got invalid server response '${response.status}' from '${url.href}'`
    );
  }

  const data = await response.text();

  return serializeToToml(data);
}

export { fetchToml };
