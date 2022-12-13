import { log_error, Problem } from "error";
import { logger } from "logger";

async function main() {
  logger.log("hello, world!");
  logger.warn("this is a warning");
  throw new Problem("expected error");
}

await main().catch((err) => {
  log_error(err);
});
