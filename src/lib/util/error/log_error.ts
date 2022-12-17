import { gray } from "fmt/colors.ts";

import { Problem } from "error";
import { logger } from "logger";
import { globals } from "globals";

function log_error(reason: Problem) {
  if (globals.command.verbose) {
    throw reason;
  }
  const message = `${reason.message} ${gray(`(${reason.code})`)}`;
  logger.error(message);

  // Normal Error was passed without code
  if (!reason.code) {
    reason.code = 1;
  }
  Deno.exit(reason.code);
}

export { log_error };
