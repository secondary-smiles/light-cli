import { logger } from "logger";

import { pathExists } from "lib/file/exists.ts";

async function symlink(from: string, to: string) {
  if (await pathExists(to)) {
    logger.warn(`symlink already exists at ${to}, overwriting..`)
    await Deno.remove(to);
  }

  await Deno.symlink(from, to);
}

export { symlink };
