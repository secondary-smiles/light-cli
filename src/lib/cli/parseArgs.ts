import { type Args, parse } from "flags/mod.ts";

import { PREFIX } from "../../globals.ts";
import { AllCommands } from "./commands/mod.ts";
import { Command } from "./args.ts";
import { error } from "../util/error.ts";

interface ProgramArgs {
  source: string;
  commands: string[];
}

interface AppArgs {
  programArgs: ProgramArgs | null;
  appCommands: Command[];
}

interface SplitArgs {
  programArgs: ProgramArgs | null;
  appArgs: string[];
}

function parseArgs(customArgs: string[] = []) {
  if (customArgs.length < 1) {
    customArgs = Deno.args;
  }

  const splitArgs = separateArgs(customArgs);

  const args: Args = parse(splitArgs.appArgs);

  const commands = getCommandsFromArgs(args);

  const appArgs: AppArgs = {
    programArgs: splitArgs.programArgs,
    appCommands: commands,
  };

  return appArgs;
}

function separateArgs(args: string[]) {
  let appArgs: string[] = args;
  let programArgsList: string[] = [];
  args.forEach((arg, i) => {
    if (arg.startsWith(PREFIX) && arg.length > 1) {
      appArgs = args.slice(0, i);
      programArgsList = args.slice(i, args.length);
    }
  });

  if (programArgsList.length > 0) {
    const keyword = programArgsList[0].slice(1);
    const programArgs: ProgramArgs = {
      source: keyword,
      commands: programArgsList.slice(1),
    };

    const splitArgs: SplitArgs = {
      programArgs: programArgs,
      appArgs: appArgs,
    };

    return splitArgs;
  }

  const splitArgs: SplitArgs = {
    programArgs: null,
    appArgs: appArgs,
  };

  return splitArgs;
}

function getCommandsFromArgs(args: Args) {
  const parsedCommands: Command[] = [];

  for (const key in args) {
    let validKey = false;

    if (key === "_") {
      continue;
    }

    for (const commandKey in AllCommands) {
      const command = AllCommands[commandKey];

      if (key === command.arg.short || key === command.arg.long) {
        parsedCommands.push(command);
        validKey = true;
      }
    }

    if (!validKey) {
      error(new Error(`Argument '${key}' not valid in this context`));
    }
  }

  return parsedCommands;
}

export { parseArgs };
