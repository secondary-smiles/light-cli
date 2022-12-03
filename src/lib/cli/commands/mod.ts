import { Command } from "../args.ts";

import * as execute from "./execute.ts";
import * as destroy from "./destroy.ts";
import * as program_version from "./program_version.ts";

import * as help from "./help.ts";
import * as app_version from "./app_version.ts";

interface IAllCommands {
  [key: string]: Command;
}

export const AllCommands: IAllCommands = {
  execute: execute.get(),
  destroy: destroy.get(),
  program_version: program_version.get(),

  help: help.get(),
  app_version: app_version.get(),
};
