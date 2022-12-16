import { Command } from "./types.ts";

// COMMANDS
import * as verbose from "./verbose.ts";
import * as silent from "./silent.ts";

import * as app_version from "./app_version.ts";
import * as help from "./help.ts";

interface CommandsIndex {
  [key: string]: Command;
}

const AllCommands: CommandsIndex = {
  verbose: verbose.get(),
  silent: silent.get(),

  app_version: app_version.get(),
  help: help.get(),
};

export { AllCommands };
