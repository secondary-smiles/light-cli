import { ProgramAction } from "../program/toml.ts";
import { INTERPOLATES, NAME } from "../../globals.ts";
import { ProgramArgs } from "../cli/parseArgs.ts";

function genBinloc(toml: ProgramAction) {
  const home = Deno.env.get("HOME");
  const postfix = `/.${NAME}/${NAME}/d/${toml.name}/bin`;

  return home + postfix;
}

function genFinalBinloc(toml: ProgramAction, program: ProgramArgs) {
  const home = Deno.env.get("HOME");
  const postfix = `/.${NAME}/${program.source}/${toml.name}/${INTERPOLATES.version}/bin`;

  return home + postfix;
}

export { genBinloc, genFinalBinloc };
