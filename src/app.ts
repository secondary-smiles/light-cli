import {parse} from "https://deno.land/std@0.167.0/flags/mod.ts";
import {parseArgs} from "./lib/cli/parse.ts";
import {info} from "./lib/util/info.ts";

const parsed = parseArgs(parse(Deno.args));

parsed.forEach(c => {
    c.run();
})