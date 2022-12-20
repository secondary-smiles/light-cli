import { Problem } from "error";
import { logger } from "logger";
import { globals } from "globals";

import { ensureFile, ensureDir } from "fs/mod.ts";

import { Prompt } from "lib/util/interact/types.ts";
import { promptUser } from "lib/util/interact/prompt.ts";
import { displayBashScript } from "./display.ts";

async function runAsBash(cwd: string, bash: string) {
  logger.verbose(cwd, bash);

  ensureDir(cwd);

  // Define options
  const run: Prompt = {
    key: "r",
    recursive: false,
    resolve_to: true,
  };

  const cancel: Prompt = {
    key: "c",
    recursive: false,
    resolve_to: false,
  };

  const view: Prompt = {
    key: "v",
    run: () => displayBashScript("unverified bash script", bash),
    recursive: true,
  };

  const option = promptUser(
    "program requires running an untested bash script\n[r]un, [c]ancel, [v]iew",
    [run, cancel, view]
  );
  if (!option) {
    throw new Problem("run cancelled by user");
  }

  logger.load()

  const runFile = cwd + "/light-run.sh";
  await ensureFile(runFile);

  await Deno.writeTextFile(runFile, bash);

  const command: Deno.RunOptions = {
    cwd: cwd,
    cmd: ["sh", "./light-run.sh"],
    stdin: globals.parse.run_output,
    stdout: globals.parse.run_output,
    stderr: globals.parse.run_output,
  };

  const process = await Deno.run(command);
  const status = await process.status();

  logger.stopLoad();

  if (!status.success) {
    throw new Problem(`bash script exited with status '${status.code}'`);
  }
}

export { runAsBash };
