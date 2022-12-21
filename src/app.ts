import { globals } from "globals";
import { log_error, Problem } from "error";
import { logger } from "logger";

import { parse } from "lib/cli/parse/parse.ts";
import { runCommands } from "lib/cli/utils/run.ts";

import { Provides } from "lib/toml/provides/types.ts";
import { Action } from "lib/toml/action/types.ts";

import { fetchToml } from "lib/coordinate/net/fetchToml.ts";
import { isProvides } from "lib/toml/provides/valid.ts";
import { getLinkFromProvides } from "lib/toml/provides/util/links.ts";
import { interpolateAction } from "lib/toml/action/interpolates.ts";
import { isCached } from "lib/local/run/cached.ts";
import { install } from "lib/install/mod.ts";
import { runProgram } from "lib/local/run/run.ts";
import { isAction } from "./lib/toml/action/valid.ts";
import { cleanupRun } from "lib/install/cleanup/cleanup.ts";
import { getActionFromLink } from "./lib/coordinate/file/link.ts";

async function main() {
  const program = parse();
  runCommands(program.app);

  // Verbose only works after this point because actual global verbosity is set once commands are run
  logger.verbose(program);

  const provides = await fetchToml(program.program.source);
  logger.verbose(provides);
  if (!isProvides(provides)) {
    throw new Problem("received provides file is invalid");
  }

  const link = getLinkFromProvides(
    provides as unknown as Provides,
    program.program.program
  );
  logger.verbose(link);

  const action = await getActionFromLink(link);
  logger.verbose(action);

  let status: Deno.ProcessStatus = {
    success: true,
    code: 0,
  };
  if (await isCached(program, action)) {
    // TODO: Run from cache
    await runProgram(program);
  } else {
    // TODO: Install Deps
    for (const dep of action.dependencies) {
      const depAction = await getActionFromLink(dep);
      await install(depAction);
    }

    await install(action);

    status = await runProgram(program);
    logger.verbose(status);
  }

  // Cleanup
  await cleanupRun(program);

  logger.verbose(globals);

  if (!status.success) {
    Deno.exit(status.code);
  }
}

await main().catch((err) => {
  logger.verbose(globals);
  log_error(err);
});
