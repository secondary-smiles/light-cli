import { log_error, Problem } from "error";
import { logger } from "logger";

import { parse } from "lib/cli/parse/parse.ts";
import { runCommands } from "lib/cli/utils/run.ts";

import { fetchToml } from "lib/remote/net/fetchToml.ts";
import {globals} from "globals";

async function main() {
  const program = parse();
  runCommands(program.app);

  // Verbose only works after this point because actual verbosity is set once commands are run
  const toml = await fetchToml(program.program.source);
  logger.log(toml);

  logger.verbose(globals);
}

await main().catch((err) => {
  log_error(err);
});
