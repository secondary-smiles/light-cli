import {type Args} from "flags/mod.ts";
import {info} from "../util/info.ts";
import {PREFIX} from "../../globals.ts";

function parse(customArgs: string[] = []) {
    if (customArgs.length < 1) {
        customArgs = Deno.args
    }

    let args = separateArgs(customArgs);

    info.info(args)
}

function separateArgs(args: string[]) {
    let appArgs: string[] = [];
    let programArgs: string[] = [];
    args.forEach((arg, i) => {
        if (arg.startsWith(PREFIX)) {
            appArgs = args.slice(0, i);
            programArgs = args.slice(i, args.length);
        }
    });

    return [appArgs, programArgs];
}

export {parse}