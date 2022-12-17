import { gray } from "fmt/colors.ts";

import { Problem } from "error";
import { logger } from "logger";
import { globals } from "globals";

function log_error(reason: Problem) {
  // Normal Error was passed without code
  if (!reason.code) {
    reason.code = 1;
  }

  const message = `${reason.message} ${gray(`(${reason.code})`)}`;
  logger.error(message);

  if (globals.command.verbose) {
    //TODO: Don't throw, use Deno.stack or whatever it is
    console.trace();
  }

  Deno.exit(reason.code);
}

export { log_error };
