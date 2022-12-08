import { Arg, Command } from "../args.ts";
import {COMMANDS} from "../../../globals.ts";

const args: Arg = {
    name: "Yes",
    help: "Automatically answer yes to all prompts",
    short: "y",
    long: "",
};

function run() {
    COMMANDS.yes = true;
}

export function get() {
    return new Command(args, run);
}
