import {bold, gray, brightGreen} from "fmt/colors.ts";

export const VERSION = "0.0.1";
export const NAME = "light";
export const ABOUT = "Placeholder about text";
export const PREFIX = '+';
export const USAGE  = `${(NAME)} [${bold("FLAGS")}] ${brightGreen(PREFIX)}<${bold("SOURCE")}> <${gray("SOURCE PROGRAM")}> [${gray("SOURCE PROGRAM FLAGS")}]`;
export const ACTION = "action.toml";
export const TIMEOUT = 6000;

export let INTERPOLATES = {
    version: "0.0.0",
    binloc: "path/to/binloc"
};