import { gray } from "fmt/colors.ts";

import { Problem } from "error";
import { logger } from "logger";

function log_error(reason: Problem) {
  // TODO: Log {reason}
  const message = `${reason.message} ${gray(`(${reason.code})`)}`;
  logger.error(message);

  Deno.exit(reason.code);
}

export { log_error };
