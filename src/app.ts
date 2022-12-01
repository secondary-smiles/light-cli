import {parse} from "https://deno.land/std@0.167.0/flags/mod.ts";
import {parseCli} from "./lib/cli/parse.ts";
import {info} from "./lib/util/info.ts";

const parsed = parseCli(parse(Deno.args));

parsed.args.forEach((a) => {
    info.log(a);
})