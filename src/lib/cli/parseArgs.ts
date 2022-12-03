import { type Args, parse } from "flags/mod.ts";

import { info } from "../util/info.ts";
import { PREFIX } from "../../globals.ts";
import { AllCommands } from "./commands/mod.ts";
import { Command } from "./args.ts";
import { error } from "../util/error.ts";

function parseArgs(customArgs: string[] = []) {
  if (customArgs.length < 1) {
    customArgs = Deno.args;
  }

  const splitArgs = separateArgs(customArgs);

  const args: Args = parse(splitArgs[0]);

  const commands = getCommandsFromArgs(args);

  if (commands instanceof Error) {
    error(commands);
  }

  info.log(commands);
}

function separateArgs(args: string[]) {
  let appArgs: string[] = args;
  let programArgs: string[] = [];
  args.forEach((arg, i) => {
    if (arg.startsWith(PREFIX) && arg.length > 1) {
      appArgs = args.slice(0, i);
      programArgs = args.slice(i, args.length);
    }
  });

  return [appArgs, programArgs];
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
      return new Error(`Argument '${key}' not valid in this context`);
    }
  }

  return parsedCommands;
}

export { parseArgs };
