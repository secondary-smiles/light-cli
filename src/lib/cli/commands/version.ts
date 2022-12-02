import {Arg, Command} from "../args.ts";
import {info} from "../../util/info.ts";

import {VERSION, NAME} from "../../../globals.ts";

const args: Arg = {
    name: "Version",
    help: "Print version and exit",
    short: "V",
    long: ""
};

function run() {
    info.log(`${NAME} -- v${VERSION}`);

    Deno.exit(0)
}

export function get() {
    return new Command(args, run, false);
}