import { info } from "./info.ts";
import { NAME } from "../../globals.ts";
import { bold } from "fmt/colors.ts";

function error(message: Error, code = 1): never {
  // info.error(message.message);
  //
  // info.log('')
  // info.info(`run ${bold(NAME + " -h")} for more information`);
  // Deno.exit(code);
  throw message;
}

export { error };
