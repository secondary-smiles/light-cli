import { Arg, Command } from "../args.ts";
import {COMMANDS} from "../../../globals.ts";

const args: Arg = {
    name: "Core",
    help: "Try to get program from core instead of source",
    short: "c",
    long: "core",
};

function run() {
    COMMANDS.core = true;
}

export function get() {
    return new Command(args, run);
}
