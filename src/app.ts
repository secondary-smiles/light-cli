import { AppCommand, parseArgs } from "./lib/cli/parseArgs.ts";
import { resolveSource } from "./lib/program/source.ts";
import { info } from "./lib/util/info.ts";
import { error } from "./lib/util/error.ts";

async function main() {
  const program = parseArgs(Deno.args);

  runCommands(program.appCommands);
  if (program.programArgs) {
    const data = await resolveSource(program.programArgs);

    // info.log(data);
  }
}

function runCommands(commands: AppCommand[]) {
  commands.forEach((command) => {
    command.command.run(command.arg);
  });
}

// Begin the program
main().catch((err) => error(new Error(err)));
