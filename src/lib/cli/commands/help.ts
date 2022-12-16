import { bold, underline, brightGreen, gray } from "fmt/colors.ts";

import { AllCommands } from "./mod.ts";
import { Arg, Command } from "lib/cli/commands/types.ts";
import { logger } from "logger";

const args: Arg = {
  name: "Help",
  help: "Prints this help text",
  long: "help",
  short: "h",
};

function run(): never {
  const USAGE = `light [${bold("FLAGS")}] ${brightGreen("+")}<${bold(
    "SOURCE"
  )}> <${gray("SOURCE PROGRAM")}> [${gray("SOURCE PROGRAM FLAGS")}]`;
  const TAB = "  ";

  // About
  logger.log(bold("Placeholder about text"));

  // Usage
  logger.log(bold(underline("Usage:")));
  logger.log(TAB + USAGE);

  // Options
  logger.log(bold(underline("Options:")));

  for (const key in AllCommands) {
    const command: Command = AllCommands[key];

    let column1;
    if (command.arg.short && command.arg.long) {
      column1 = `-${command.arg.short}, --${command.arg.long}`;
    } else {
      const prefix = command.arg.short ? "-" : "--";
      column1 = prefix + command.arg.short + command.arg.long;
    }

    const column2 = command.arg.help;

    logger.log(TAB + bold(column1) + TAB + column2);
  }

  Deno.exit(0);
}

export function get() {
  return new Command(args, run, false);
}
