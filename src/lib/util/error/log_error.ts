import Problem from "util/error/error_type.ts";

function log_error(reason: Problem) {
  // TODO: Log log_error
  Deno.exit(reason.code);
}

export { log_error };
