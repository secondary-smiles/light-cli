import { Command } from "./types.ts";

// COMMANDS
import * as app_version from "./app_version.ts";
import * as help from "./help.ts";

interface CommandsIndex {
  [key: string]: Command;
}

const AllCommands: CommandsIndex = {
  app_version: app_version.get(),
  help: help.get(),
};

export { AllCommands };
