import { Args as ParsedArgs } from "flags/mod.ts";
import { Command } from "lib/cli/commands/types.ts";

type Flag = string | number | boolean;

interface Program {
  app: [Flag, Command][];
  program: ProgramCommands
}

interface PreparsedArgs {
  rawAppArgs: ParsedArgs;
  program: ProgramCommands;
}

interface ProgramCommands {
  source: string;
  program: string;
  args?: (Flag)[];
}

export type { PreparsedArgs, ProgramCommands, Program, Flag };