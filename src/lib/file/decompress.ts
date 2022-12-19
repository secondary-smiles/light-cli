import { ensureDir } from "fs/mod.ts";

async function decompress(file: string, out: string) {
  await ensureDir(out);
  const command: Deno.RunOptions = {
    cmd: ["tar", "xf", file, "-C", out],
    stdin: "null",
    stdout: "null",
    stderr: "null",
  };

  const process = await Deno.run(command);

  console.log(await process.status());
}

export { decompress };
