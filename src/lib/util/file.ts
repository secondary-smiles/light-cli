import { ProgramAction } from "../program/toml.ts";
import { INTERPOLATES, NAME } from "../../globals.ts";
import { ProgramArgs } from "../cli/parseArgs.ts";

function genBinloc(toml: ProgramAction, program: ProgramArgs) {
  const home = Deno.env.get("HOME");
  const postfix = `/.${NAME}/${program.source}/${toml.name}/${INTERPOLATES.version}/bin`;

  return home + postfix;
}

export { genBinloc };
