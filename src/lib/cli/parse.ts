import {type Args} from "https://deno.land/std@0.167.0/flags/mod.ts";

import {AllCommands} from "./commands/mod.ts";
import {NAME, PREFIX} from "../../globals.ts";
import {Command} from "./args.ts";
import {error} from "../util/error.ts";

interface ParsedCli {
    keyword: string,
    args: Array<Array<Command | string>>,
}

function parseCli(args: Args) {
        let keyword = parseSite(args['_']);
        if (keyword instanceof Error) {
            error(keyword.message);
            return;
        }

        let parsedCli: ParsedCli = {
            keyword: keyword,
            args: parseArgs(args)
        }

        return parsedCli;
}

function parseSite(args: Array<string | number>) {
    if (args.length != 1) {
        return new Error(`Wrong number of arguments. Run ${NAME} --help for usage`)
    }

    if (!args[0].toString().startsWith(PREFIX)) {
        return new Error(`'${args[0]}' is not a valid keyword.`)
    }

    if (args[0].toString().length < 5) {
        return new Error(`'${args[0]}' is not a valid keyword.`)
    }

    return args[0].toString();
}

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
                validCommands.push([command, args[key]]);
            }
        }
    }
    return validCommands;
}

export {parseCli}