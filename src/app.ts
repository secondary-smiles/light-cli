import {parse} from "https://deno.land/std@0.167.0/flags/mod.ts";
import {parseCli} from "./lib/cli/parse.ts";
import {info} from "./lib/util/info.ts";
import {Command} from "./lib/cli/args.ts";
import {error} from "./lib/util/error.ts";

function main() {
    const parsed = parseCli(parse(Deno.args));
    if (!parsed) {
        error("Uncaught exception");
        return;
    }

    runCommands(parsed.args);
}

function runCommands(commands: Array<[Command, string]>) {
    commands.forEach(c => {
        c[0].run(c[1]);
    })
}

// Begin the program
main();