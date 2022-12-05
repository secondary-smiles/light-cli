import { AppCommand, parseArgs } from "./lib/cli/parseArgs.ts";
import { resolveSource } from "./lib/program/source.ts";

function main() {
  const program = parseArgs(Deno.args);

  runCommands(program.appCommands);
  if (program.programArgs) {
    resolveSource(program.programArgs);
  }
}

function runCommands(commands: AppCommand[]) {
  commands.forEach((command) => {
    command.command.run(command.arg);
  });
}

// Begin the program
main();
