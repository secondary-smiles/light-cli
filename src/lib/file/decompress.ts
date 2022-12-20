import { Problem } from "error";
import { logger } from "logger";
import { globals } from "globals";

import { ensureDir } from "fs/mod.ts";

async function decompress(file: string, out: string) {
  logger.load(`decompressing ${file}`);
  console.log(out)
  await ensureDir(out);
  const command: Deno.RunOptions = {
    cmd: ["tar", "xf", file, "-C", out],
    stdin: globals.parse.run_output,
    stdout: globals.parse.run_output,
    stderr: globals.parse.run_output,
  };

  const process = await Deno.run(command);
  const status = await process.status();

  logger.stopLoad();

  if (!status.success) {
    throw new Problem(`decompress exited with status '${status.code}'`);
  }
}

export { decompress };
