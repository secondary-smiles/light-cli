import { Problem } from "error";
import { logger } from "logger";

import { parse as parseAppFlags, Args as ParsedArgs } from "flags/mod.ts";
import { AllCommands } from "lib/cli/commands/mod.ts";

import { ProgramCommands, PreparsedArgs, Program, Flag } from "./types.ts";
import { Command } from "lib/cli/commands/types.ts";

function parse(args = Deno.args) {
  const preParsedArgs = separateProgramAndAppArgs(args);

  const parsedCommands = parseCommands(preParsedArgs.rawAppArgs);

  const program: Program = {
    app: parsedCommands,
    program: preParsedArgs.program,
  };

  return program;
}

function separateProgramAndAppArgs(args: string[]): PreparsedArgs {
  const prefix = "+";

  let programArgs: string[] = [];
  let appArgs: string[] = [];
  args.forEach((arg, index) => {
    if (arg.startsWith(prefix)) {
      appArgs = args.slice(0, index);
      programArgs = args.slice(index);
    }
  });

  const programCommands = parseProgramCommands(programArgs);
  const parsedAppArgs = parseAppFlags(appArgs);

  return {
    rawAppArgs: parsedAppArgs,
    program: programCommands,
  };
}

function parseProgramCommands(args: string[]) {
  // Validation checks
  if (args.length < 2)
    throw new Problem("source and program must be specified");
  if (args[0].length < 2)
    throw new Problem("cannot pass prefix without argument");

  const programCommands: ProgramCommands = {
    // Clear prefix from source
    source: args[0].slice(1),
    program: args[1],
    args: args.slice(2),
  };

  return programCommands;
}

function parseCommands(args: ParsedArgs) {
  // Command validation
  if (args["_"].length != 0) {
    throw new Problem(`command '${args["_"][0]}' not allowed`)
  }

  const parsedCommands: [Flag, Command][] = [];

  for (const key in args) {
    if (key == "_") continue;

    let validArg = false;

    for (const commandKey in AllCommands) {
      const command = AllCommands[commandKey];

      if (key == command.arg.long || key == command.arg.short) {
        parsedCommands.push([args[key], command]);
        validArg = true;
      }
    }

    if (!validArg) {
      throw new Problem(`arg '${key}' not recognized`);
    }
  }

  return parsedCommands;
}

export { parse };
