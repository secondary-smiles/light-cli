import { log_error, Problem } from "error";
import { logger } from "logger";

import { parse } from "lib/cli/parse/parse.ts";
import { runCommands } from "lib/cli/utils/run.ts";

import { fetchToml } from "lib/remote/net/fetchToml.ts";
import {globals} from "globals";
import {isProvides} from "lib/toml/provides/valid.ts";

async function main() {
  const program = parse();
  runCommands(program.app);

  // Verbose only works after this point because actual verbosity is set once commands are run
  logger.verbose(globals);

  const toml = await fetchToml(program.program.source);
  logger.verbose(toml)
  logger.log(isProvides(toml));

}

await main().catch((err) => {
  log_error(err);
});
