import { AppCommand, parseArgs, ProgramArgs } from "./lib/cli/parseArgs.ts";
import { followSymlink, resolveSource } from "./lib/program/source.ts";
import { error } from "./lib/util/error.ts";
import { Provide, ProgramAction, Action } from "./lib/program/toml.ts";
import { install } from "./lib/install/mod.ts";
import {
  interpolateVersion,
  interpolateBinloc,
} from "./lib/program/interpolates.ts";
import { preclean, postclean } from "./lib/util/cleanup.ts";
import { runProgram } from "./lib/program/run.ts";
import { isCached } from "./lib/cache/isCached.ts";
import { fileExists } from "./lib/util/file.ts";
import { info } from "./lib/util/info.ts";
import { ACTION, PROVIDES } from "./globals.ts";

async function main() {
  const program = parseArgs(Deno.args);

  runCommands(program.appCommands);

  if (program.programArgs) {
    await preclean();

    const cachedStatus = await isCached(program);
    if (cachedStatus) {
      const cacheFolder = cachedStatus + "/bin/";
      const cacheFile = cacheFolder + program.programArgs.program;
      if (await fileExists(cacheFile)) {
        const status = await runProgram(program.programArgs, cacheFolder);
        await postclean(program.programArgs);
        evalRun(status);
        return;
      }
    }

    // Download, unpack, compile, install, and run.
    info.load(`fetching ${PROVIDES}`);
    const provides = await resolveSource(program.programArgs);

    info.load(`fetching ${ACTION}`);
    const foundProgram = await findProgram(provides, program.programArgs);

    const command = {
      toml: foundProgram[0],
      index: foundProgram[1],
    };

    command.toml = interpolateVersion(command.toml);
    command.toml = interpolateBinloc(command.toml);

    info.load("installing");
    await install(command.toml, program);
    info.stopLoad();
    const status = await runProgram(program.programArgs);
    await postclean(program.programArgs);
    evalRun(status);
  }

  return;
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

function evalRun(status: Deno.ProcessStatus) {
  if (!status.success) {
    Deno.exit(status.code);
  }
}

// Begin the program
await main()