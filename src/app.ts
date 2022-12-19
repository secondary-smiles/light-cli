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
import { isAction } from "lib/toml/action/valid.ts";
import { interpolateAction } from "lib/toml/action/interpolates.ts";
import { isCached } from "lib/local/run/cached.ts";

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

  let action = await fetchToml(link.source);
  logger.verbose(action);
  if (!isAction(action)) {
    throw new Problem("received action file is invalid");
  }

  action = interpolateAction(action as unknown as Action);
  logger.verbose(action);

  if (await isCached(program, action as unknown as Action)) {
    console.log("cached");
    // TODO: Run from cache
  }
}

await main().catch((err) => {
  log_error(err);
});
