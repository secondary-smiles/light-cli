import {ProgramAction} from "../program/toml.ts";
import { AppArgs } from "../cli/parseArgs.ts";
import {getSourceFromWeb} from "./net.ts";

function install(toml: ProgramAction, program: AppArgs) {
    const source = getSourceFromWeb(toml.source)
}

export { install };
