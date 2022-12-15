import { log_error, Problem } from "error";
import { logger } from "logger";

import { parse } from "lib/cli/parse/parse.ts";
import {runCommands} from "lib/cli/utils/run.ts";

async function main() {
  const program = parse();
  runCommands(program.app)

  
}

await main().catch((err) => {
  log_error(err);
});
