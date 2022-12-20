import { Args as ParsedArgs } from "flags/mod.ts";
import { Command } from "lib/cli/commands/types.ts";

interface Program {
  app: CommandGroup[];
  program: ProgramCommands;
}

interface CommandGroup {
  flag: string;
  command: Command;
}

interface PreparsedArgs {
  rawAppArgs: ParsedArgs;
  rawProgramArgs: string[];
}

interface ProgramCommands {
  source: string;
  program: string;
  args: string[];
}

export type { PreparsedArgs, ProgramCommands, Program, CommandGroup };
