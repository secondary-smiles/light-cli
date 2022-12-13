import { Command } from "lib/cli/types.ts";

interface CommandsIndex {
  [key: string]: Command;
}

const AllCommands: CommandsIndex = {};

export { AllCommands };
