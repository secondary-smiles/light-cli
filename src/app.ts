import { log_error } from "util/error/log_error.ts";
import Problem from "util/error/error_type.ts";

async function main() {
  console.log("hello, world!");
  throw new Problem("expected error");
}

await main().catch((err) => {
  log_error(err);
});
