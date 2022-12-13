import { log_error, Problem } from "error";
import { logger } from "logger";

async function main() {
  logger.log("hello, world!");
  logger.notice("this is a notice");
  logger.warn("this is a warning");

  logger.load("loading for a second");
  await new Promise((r) => setTimeout(r, 1000));
  throw new Problem("and this is a thrown error");
}

await main().catch((err) => {
  log_error(err);
});
