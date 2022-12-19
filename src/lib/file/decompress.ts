import { Problem } from "error";
import { logger } from "logger";

import { ensureDir } from "fs/mod.ts";

async function decompress(file: string, out: string) {
  logger.load(`decompressing ${file}`);
  await ensureDir(out);
  const command: Deno.RunOptions = {
    cmd: ["tar", "xf", file, "-C", out],
    stdin: "null",
    stdout: "null",
    stderr: "null",
  };

  const process = await Deno.run(command);
  const status = await process.status();

  logger.stopLoad();

  if (!status.success) {
    throw new Problem(`decompress exited with status '${status.code}'`);
  }
}

export { decompress };
