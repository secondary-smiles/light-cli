import { log_error, Problem } from "error";
import { logger } from "logger";

import { parse } from "lib/cli/parse/parse.ts";
import { runCommands } from "lib/cli/utils/run.ts";

import { fetchToml } from "lib/net/util/fetchToml.ts";

async function main() {
  const program = parse();
  runCommands(program.app);

  // Verbose only works after this point because actual verbosity is set once commands are run
  const toml = await fetchToml(new URL("https://lightblog.dev/light/provides.toml"));
  logger.log(toml);
}

await main().catch((err) => {
  log_error(err);
});
