import { error } from "../util/error.ts";
import { INTERPOLATES } from "../../globals.ts";
import { ensureDir } from "fs/ensure_dir.ts";

async function decompress(fileloc: string) {
  const destloc = INTERPOLATES.sourceloc + "/decompressed";
  await ensureDir(destloc);

  const command: Deno.RunOptions = {
    cwd: INTERPOLATES.sourceloc,
    cmd: ["tar", "xf", "source", "-C", "decompressed"]
  }

  try {
    await Deno.run(command);
  } catch (err) {
    error(err);
  }

  return destloc;
}

export { decompress };
