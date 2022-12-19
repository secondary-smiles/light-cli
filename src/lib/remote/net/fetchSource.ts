import { logger } from "logger";
import { globals } from "globals";

import { Problem } from "error";

import { ensureFile } from "fs/mod.ts";

import { preprocessUrl } from "./url.ts";

async function fetchSource(source: string) {
  logger.load(`fetching ${source}`);
  const url = preprocessUrl(source);
  logger.verbose(url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Problem(
      `got invalid server response '${response.status}' from ${url.href}`
    );
  }

  const sourceloc = globals.parse.interpolated_sourceloc + "/source";
  await ensureFile(sourceloc);

  const file = await Deno.open(sourceloc, {
    create: true,
    write: true,
  });

  await response.body!.pipeTo(file.writable);

  logger.stopLoad();
}

export { fetchSource };
