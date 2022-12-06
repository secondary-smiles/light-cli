import { AppCommand, parseArgs, ProgramArgs } from "./lib/cli/parseArgs.ts";
import { resolveSource } from "./lib/program/source.ts";
import { error } from "./lib/util/error.ts";
import { Action, ProgramAction } from "./lib/program/toml.ts";
import { install } from "./lib/install/mod.ts";
import {
  interpolateVersion,
  interpolateBinloc,
} from "./lib/program/interpolates.ts";

async function main() {
  const program = parseArgs(Deno.args);

  runCommands(program.appCommands);
  if (program.programArgs) {
    const toml = await resolveSource(program.programArgs);

    const foundProgram = findProgram(toml, program.programArgs);

    const command = {
      toml: foundProgram[0],
      index: foundProgram[1],
    };

    command.toml = interpolateVersion(command.toml);
    command.toml = interpolateBinloc(command.toml);

    toml.provides[command.index] = command.toml;

    await install(command.toml, program);
  }
}

function runCommands(commands: AppCommand[]) {
  commands.forEach((command) => {
    command.command.run(command.arg);
  });
}

function findProgram(
  toml: Action,
  program: ProgramArgs
): [ProgramAction, number] {
  let commandToml: ProgramAction | null = null;

  let index: number | null = null;
  toml.provides!.forEach((item, i) => {
    if (item.name === program.program) {
      commandToml = item;
      index = i;
    }
  });

  if (!commandToml || typeof index !== "number") {
    error(
      new Error(
        `'${program.source}' does not provide program '${program.program}'`
      )
    );
  }

  return [commandToml, index];
}

// Begin the program
await main()
