import {type Args} from "https://deno.land/std@0.167.0/flags/mod.ts";

import {AllCommands} from "./commands/mod.ts";

function parseArgs(args: Args) {
    let firstKey = true;
    const validCommands = [];

    for (const key in args) {
        if (firstKey) {
            firstKey = false;
            continue;
        }

        for (const commandKey in AllCommands) {
            const command = AllCommands[commandKey];

            if (key === command.arg.long || key === command.arg.short) {
                validCommands.push(command);
            }
        }
    }
    return validCommands;
}

export {parseArgs}