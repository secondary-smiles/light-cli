import { AppCommand, parseArgs } from "./lib/cli/parseArgs.ts";
import { resolveSource } from "./lib/program/source.ts";
import { info } from "./lib/util/info.ts";

function main() {
  const program = parseArgs(Deno.args);

  info.info(program);
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
