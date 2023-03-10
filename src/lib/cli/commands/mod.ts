import { Command } from "./types.ts";

// COMMANDS
import * as core from "./core.ts";
import * as destroy from "./destroy.ts";
import * as program_version from "./program_version.ts";
import * as verbose from "./verbose.ts";
import * as silent from "./silent.ts";
import * as yes from "./yes.ts";

import * as app_version from "./app_version.ts";
import * as help from "./help.ts";

interface CommandsIndex {
  [key: string]: Command;
}

const AllCommands: CommandsIndex = {
  core: core.get(),
  destroy: destroy.get(),
  program_version: program_version.get(),
  verbose: verbose.get(),
  silent: silent.get(),
  yes: yes.get(),

  app_version: app_version.get(),
  help: help.get(),
};

export { AllCommands };
