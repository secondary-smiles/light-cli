import { parseArgs } from "./lib/cli/parseArgs.ts";
import { info } from "./lib/util/info.ts";
import { Command } from "./lib/cli/args.ts";
import { error } from "./lib/util/error.ts";
import { AllCommands } from "./lib/cli/commands/mod.ts";

function main() {
  let commands = parseArgs(Deno.args);

  // AllCommands.help.run()
}

// Begin the program
main();
