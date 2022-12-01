import {Arg, Command} from "../args.ts";
import {AllCommands} from "./mod.ts"
import {info} from "../../util/info.ts";
import {bold, underline} from "fmt/colors.ts"

const args: Arg = {
    name: "Help",
    help: "Prints this help text",
    long: "help",
    short: "h"
}

function run() {
    const TAB = '  ';

    info.log(bold("NPX for OSes"))

    info.log(bold(underline("Options:")))

    for (const key in AllCommands) {
        const command: Command = AllCommands[key];

        let column1;
        if (command.arg.short && command.arg.long) {
            column1 = `-${command.arg.short}, --${command.arg.long}`;
        } else {
            const prefix = command.arg.short ? "-" : "--";
            column1 = prefix + command.arg.short + command.arg.long
        }

        let column2 = command.arg.help;

        info.log(TAB + bold(column1) + TAB + column2)
    }
}

export function get() {
    return new Command(args, run);
}