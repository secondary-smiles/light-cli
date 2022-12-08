import { ProgramAction } from "../program/toml.ts";
import { INTERPOLATES, NAME } from "../../globals.ts";
import { ProgramArgs } from "../cli/parseArgs.ts";
import { ensureDir } from "fs/ensure_dir.ts";
import { error } from "./error.ts";

function genHome() {
  const home = Deno.env.get("HOME");
  const postfix = `/.${NAME}`;

  INTERPOLATES.homeloc = home + postfix;
}

function genSource() {
  const home = Deno.env.get("HOME");
  const postfix = `/.${NAME}/${NAME}/d`;
  const loc = home + postfix;

  ensureDir(loc).catch((err) => error(err));

  INTERPOLATES.baseloc = loc;
}

function genBinloc(toml: ProgramAction) {
  genSource();

  const postfix = `/${toml.name}/bin`;
  const loc = INTERPOLATES.baseloc + postfix;
  ensureDir(loc).catch((err) => error(err));

  return loc;
}

function genFinalBinloc(toml: ProgramAction, program: ProgramArgs) {
  const home = Deno.env.get("HOME");
  const postfix = `/.${NAME}/${program.source}/${toml.name}/${INTERPOLATES.version}/bin`;
  const loc = home + postfix;

  ensureDir(loc).catch((err) => error(err));

  return loc;
}

function genSourceLoc(toml: ProgramAction) {
  const postfix = `/${toml.name}/raw`;
  const loc = INTERPOLATES.baseloc + postfix;

  ensureDir(loc).catch((err) => error(err));
  return loc;
}

async function fileExists(file: string) {
  try {
    await Deno.stat(file);
    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    } else {
      error(err);
    }
  }
}

export { genHome, genSource, genBinloc, genFinalBinloc, genSourceLoc, fileExists };
