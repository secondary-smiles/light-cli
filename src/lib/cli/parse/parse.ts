import { Problem } from "error";

import { parse as parseAppFlags, Args as ParsedArgs } from "flags/mod.ts";
import { AllCommands } from "lib/cli/commands/mod.ts";

import {
  ProgramCommands,
  PreparsedArgs,
  Program,
  CommandGroup,
} from "./types.ts";
import { globals } from "../../../globals.ts";

function parse(args = Deno.args) {
  const preParsedArgs = separateProgramAndAppArgs(args);

  const parsedCommands = parseCommands(preParsedArgs.rawAppArgs);
  let parsedProgram = parseProgramCommands(preParsedArgs.rawProgramArgs);

  if (!parsedProgram) {
    if (globals.parse.never) {
      // We don't actually need a program if the command invoked returns never
      parsedProgram = {
        program: "",
        source: "",
      };
    } else {
      throw new Problem("flags supplied require source and program");
    }
  }

  const program: Program = {
    app: parsedCommands,
    program: parsedProgram,
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

  if (programArgs.length == 0 && appArgs.length == 0) {
    appArgs = args;
  }

  const parsedAppArgs = parseAppFlags(appArgs);

  return {
    rawAppArgs: parsedAppArgs,
    rawProgramArgs: programArgs,
  };
}

function parseProgramCommands(args: string[]) {
  // Check program is needed
  if (args.length == 0 || globals.parse.never) return null;

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
    throw new Problem(`command '${args["_"][0]}' not allowed`);
  }

  const parsedCommands: CommandGroup[] = [];

  for (const key in args) {
    if (key == "_") continue;

    let validArg = false;

    for (const commandKey in AllCommands) {
      const command = AllCommands[commandKey];

      if (key == command.arg.long || key == command.arg.short) {
        parsedCommands.push({ flag: args[key], command });

        if (!command.needsProgram) {
          globals.parse.never = true;
        }
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
