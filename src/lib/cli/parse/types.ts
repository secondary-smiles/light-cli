import { Args as ParsedArgs } from "flags/mod.ts";

interface Args {
  app: ParsedArgs;
  program: ProgramCommands;
}

interface ProgramCommands {
  source: string;
  program: string;
  args: (string | number | boolean)[];
}

export type { Args, ProgramCommands };
