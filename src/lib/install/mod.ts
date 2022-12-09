import { ProgramAction } from "../program/toml.ts";
import { AppArgs } from "../cli/parseArgs.ts";
import { getSourceFromWeb } from "./net.ts";
import { INTERPOLATES } from "../../globals.ts";
import { genSourceLoc } from "../util/file.ts";
import { decompress } from "./compress.ts";
import { runInstall, runTest, installBinary } from "./shell.ts";
import { info } from "../util/info.ts";

async function install(toml: ProgramAction, program: AppArgs) {
  INTERPOLATES.sourceloc = genSourceLoc(toml);
  info.load("downloading program (1 of 5)");
  const fileloc = await getSourceFromWeb(toml);

  info.load("decompressing program (2 of 5");
  const decompressedFileLoc = await decompress(fileloc);

  info.load("compiling program (3 of 5)");
  await runInstall(toml, decompressedFileLoc);

  info.load("testing program (4 of 5)");
  await runTest(toml, INTERPOLATES.binloc);

  info.load("installing program (5 of 5)");
  await installBinary(toml, program.programArgs!);

  return true;
}

export { install };
