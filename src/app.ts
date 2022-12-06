import { AppCommand, parseArgs, ProgramArgs } from "./lib/cli/parseArgs.ts";
import { resolveSource } from "./lib/program/source.ts";
import { info } from "./lib/util/info.ts";
import { error } from "./lib/util/error.ts";
import { Action, ProgramAction, validAction } from "./lib/program/toml.ts";
import {
  interpolateVersion,
  interpolateBinloc,
} from "./lib/program/interpolates.ts";
import { genBinloc } from "./lib/util/file.ts";
import {INTERPOLATES} from "./globals.ts";

async function main() {
  const program = parseArgs(Deno.args);

  runCommands(program.appCommands);
  if (program.programArgs) {
    const toml = await resolveSource(program.programArgs);

    let commandToml = findProgram(toml, program.programArgs);

    INTERPOLATES.binloc = genBinloc(commandToml, program.programArgs);
    commandToml = interpolateVersion(commandToml);
    commandToml = interpolateBinloc(commandToml, program.programArgs);

    info.log(commandToml)
  }
}

function runCommands(commands: AppCommand[]) {
  commands.forEach((command) => {
    command.command.run(command.arg);
  });
}

function findProgram(toml: Action, program: ProgramArgs): ProgramAction {
  let commandToml: ProgramAction | null = null;
  toml.provides!.forEach((item) => {
    if (item.name === program.program) {
      commandToml = item;
    }
  });

  if (!commandToml) {
    error(
      new Error(
        `'${program.source}' does not provide program '${program.program}'`
      )
    );
  }

  return commandToml;
}

// Begin the program
main().catch((err) => error(new Error(err)));
