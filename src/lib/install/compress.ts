import { tgz } from "compress/mod.ts";

import { error } from "../util/error.ts";
import { INTERPOLATES } from "../../globals.ts";
import { ensureDir } from "fs/ensure_dir.ts";

async function decompress(fileloc: string) {
  const destloc = INTERPOLATES.sourceloc + "/decompressed";
  await ensureDir(destloc);

  try {
    await tgz.uncompress(fileloc, destloc);
  } catch (err) {
    error(err);
  }
}

export { decompress };
