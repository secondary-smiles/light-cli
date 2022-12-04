import { AppCommand, parseArgs } from "./lib/cli/parseArgs.ts";
import { AllCommands } from "./lib/cli/commands/mod.ts";
import { info } from "./lib/util/info.ts";

function main() {
  const program = parseArgs(Deno.args);

  runCommands(program.appCommands);
}

function runCommands(commands: AppCommand[]) {
  commands.forEach((command) => {
    command.command.run(command.arg);
  });
}

// Begin the program
main();
