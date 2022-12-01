import {parse} from "https://deno.land/std@0.167.0/flags/mod.ts";

import {info} from "./lib/util/info.ts";
import {allCommands} from "./lib/cli/commands/mod.ts";

const flags = parse(Deno.args)

allCommands.help.run()