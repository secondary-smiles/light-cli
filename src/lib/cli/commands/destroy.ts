import { Arg, Command } from "lib/cli/commands/types.ts";
import { globals } from "globals";

const args: Arg = {
    name: "Destroy",
    help: "Remove program after executing it",
    long: "destroy",
    short: "d",
};

function run() {
    globals.command.destroy = true;
}

export function get() {
    return new Command(args, run);
}
