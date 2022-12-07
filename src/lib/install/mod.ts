import { ProgramAction } from "../program/toml.ts";
import { AppArgs } from "../cli/parseArgs.ts";
import { getSourceFromWeb } from "./net.ts";
import { INTERPOLATES } from "../../globals.ts";
import { genSourceLoc } from "../util/file.ts";
import { decompress } from "./compress.ts";

async function install(toml: ProgramAction, program: AppArgs) {
  INTERPOLATES.sourceloc = genSourceLoc(toml);
  console.log("interp " + INTERPOLATES.sourceloc);
  const fileloc = await getSourceFromWeb(toml);
  console.log("file " + fileloc);
  const decompressedFileLoc = await decompress(fileloc);

  // await Deno.run({cmd: ["pwd"]})
  // await Deno.chdir(decompressedFileLoc);
  // await Deno.run({cmd: ["pwd"]})

  console.log("decomp " + decompressedFileLoc);
}

export { install };
