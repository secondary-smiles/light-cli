import {bold, underline, brightGreen, gray} from "fmt/colors.ts"

import {AllCommands} from "./mod.ts";
import { Arg, Command } from "lib/cli/commands/types.ts";
import {logger} from "logger";

const args: Arg = {
    name: "Version",
    help: "Prints program versiona and exits",
    long: "",
    short: "V",
};

function run() {
    logger.log(`light - ${globalThis.app.static.version}`);
}

export function get() {
    return new Command(args, run);
}
