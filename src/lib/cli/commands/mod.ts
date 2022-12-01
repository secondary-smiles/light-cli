import * as help from "./help.ts";
import {Command} from "../args.ts";

interface IAllCommands {
    [key: string]: Command
}

export const AllCommands: IAllCommands = {
    help: help.get(),
};