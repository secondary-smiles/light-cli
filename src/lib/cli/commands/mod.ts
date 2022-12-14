import { Command } from "./types.ts";

// COMMANDS
import * as help from "./help.ts";

interface CommandsIndex {
  [key: string]: Command;
}

const AllCommands: CommandsIndex = {
  help: help.get(),
};

export { AllCommands };
