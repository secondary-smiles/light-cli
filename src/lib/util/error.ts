import { info } from "./info.ts";
import { NAME } from "../../globals.ts";
import { bold, brightYellow } from "fmt/colors.ts";

function error(message: Error, code = 1): never {
  info.error(message.message);

  info.log(bold(brightYellow("---")));

  info.info(`run ${bold(NAME + " -h")} for program help`);
  Deno.exit(code);
}

export { error };
