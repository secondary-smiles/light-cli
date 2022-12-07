import { ProgramAction } from "../program/toml.ts";
import { INTERPOLATES, NAME } from "../../globals.ts";
import { ProgramArgs } from "../cli/parseArgs.ts";

function genSource() {
  const home = Deno.env.get("HOME");
  const postfix = `/.${NAME}/${NAME}/d`;

  INTERPOLATES.baseloc = home + postfix;
}

function genBinloc(toml: ProgramAction) {
  genSource()
  const postfix = `/${toml.name}/bin`;

  return INTERPOLATES.baseloc + postfix;
}

function genFinalBinloc(toml: ProgramAction, program: ProgramArgs) {
  const home = Deno.env.get("HOME");
  const postfix = `/.${NAME}/${program.source}/${toml.name}/${INTERPOLATES.version}/bin`;

  return home + postfix;
}

function genSourceLoc(toml: ProgramAction) {
  const postfix = `/${toml.name}/raw`;

  return INTERPOLATES.baseloc + postfix;
}

export { genBinloc, genFinalBinloc, genSourceLoc };
