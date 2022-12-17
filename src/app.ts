import { globals } from "globals";
import { log_error, Problem } from "error";
import { logger } from "logger";

import { parse } from "lib/cli/parse/parse.ts";
import { runCommands } from "lib/cli/utils/run.ts";

import { fetchToml } from "lib/remote/net/fetchToml.ts";
import { isProvides } from "lib/toml/provides/valid.ts";
import { getLinkFromProvides } from "lib/toml/provides/util/links.ts";
import { Provides } from "lib/toml/provides/types.ts";

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
}

await main().catch((err) => {
  log_error(err);
});
