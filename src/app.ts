import { AppCommand, parseArgs, ProgramArgs } from "./lib/cli/parseArgs.ts";
import {followSymlink, resolveSource} from "./lib/program/source.ts";
import { error } from "./lib/util/error.ts";
import {Provide, ProgramAction, Action} from "./lib/program/toml.ts";
import { install } from "./lib/install/mod.ts";
import {
  interpolateVersion,
  interpolateBinloc,
} from "./lib/program/interpolates.ts";

async function main() {
  const program = parseArgs(Deno.args);

  runCommands(program.appCommands);

  if (program.programArgs) {
    const provides = await resolveSource(program.programArgs);

    const foundProgram = await findProgram(provides, program.programArgs);

    console.log(foundProgram)

    const command = {
      toml: foundProgram[0],
      index: foundProgram[1],
    };

    command.toml = interpolateVersion(command.toml);
    command.toml = interpolateBinloc(command.toml);

    await install(command.toml, program);
  }
}

function runCommands(commands: AppCommand[]) {
  commands.forEach((command) => {
    command.command.run(command.arg);
  });
}

async function findProgram(
  toml: Provide,
  program: ProgramArgs
): Promise<[ProgramAction, number]> {
  let commandToml: Action | null = null;

  let index: number | null = null;
  for (const item of toml.provides!) {
    const i = toml.provides!.indexOf(item);
    if (item.name === program.program) {
      commandToml = await followSymlink(item.source);
      index = i;
    }
  }

  if (!commandToml || typeof index !== "number") {
    error(
      new Error(
        `'${program.source}' does not provide program '${program.program}'`
      )
    );
  }

  return [commandToml.provides, index];
}

// Begin the program
await main()
