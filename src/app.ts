import { log_error, Problem } from "error";
import { logger } from "logger";

async function main() {
  logger.log("hello, world!");
  logger.notice("this is a notice about a feature")
  logger.warn("this is a warning");
  throw new Problem("and this is a thrown error");
}

await main().catch((err) => {
  log_error(err);
});
