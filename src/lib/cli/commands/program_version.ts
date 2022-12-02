import {Arg, Command} from "../args.ts";
import {info} from "../../util/info.ts";

const args: Arg = {
    name: "Program Version",
    help: "Specify program version to look for when downloading",
    short: "v",
    long: "version"
}

function run(data: string) {
    info.info("TODO: Implement")
    info.info("Passed " + data);
}

export function get() {
    return new Command(args, run);
}