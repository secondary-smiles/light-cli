import { log_error, Problem } from "error";
import { logger } from "logger";

import { parse } from "lib/cli/parse/parse.ts";

async function main() {
  const program = parse();

  logger.log(program);
}

await main().catch((err) => {
  log_error(err);
});
