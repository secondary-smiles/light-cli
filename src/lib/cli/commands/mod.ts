import {Command} from "../args.ts";

import * as help from "./help.ts";
import * as version from "./version.ts"

interface IAllCommands {
    [key: string]: Command
}

export const AllCommands: IAllCommands = {
    help: help.get(),
    version: version.get(),
};