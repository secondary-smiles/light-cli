import {blue, bold, green, magenta} from "fmt/colors.ts";

export const VERSION = "0.0.1";
export const NAME = "light";
export const ABOUT = "Placeholder about text";
export const PREFIX = '+';
export const USAGE = `${bold(NAME)} [${blue("FLAGS")}] ${green(PREFIX)}<${blue("SOURCE")}> <${magenta("SOURCE PROGRAM")}> [${magenta("SOURCE PROGRAM FLAGS")}]`;

const f = bold(NAME) + blue(' [FLAGS] ') + green(PREFIX) + '<' + blue('SOURCE') + '> ' + '<' + magenta('SOURCE PROGRAM') + '> ' + magenta('[SOURCE PROGRAM FLAGS]');
