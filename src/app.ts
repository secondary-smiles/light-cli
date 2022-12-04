import { parseArgs } from "./lib/cli/parseArgs.ts";
import { AllCommands } from "./lib/cli/commands/mod.ts";
import { info } from "./lib/util/info.ts";

function main() {
  let program = parseArgs(Deno.args);
  info.log(program);

  // AllCommands.help.run()
}

// Begin the program
main();
