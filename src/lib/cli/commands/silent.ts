import { Arg, Command } from "lib/cli/commands/types.ts";
import { globals } from "globals";

const args: Arg = {
    name: "Silent",
    help: "Silence program output",
    long: "",
    short: "s",
};

function run() {
    globals.command.silent = true;
}

export function get() {
    return new Command(args, run);
}
