import { ProgramAction } from "../program/toml.ts";
import { AppArgs } from "../cli/parseArgs.ts";
import { getSourceFromWeb } from "./net.ts";
import { INTERPOLATES } from "../../globals.ts";
import { genSourceLoc } from "../util/file.ts";
import { decompress } from "./compress.ts";
import {info} from "../util/info.ts";
import {ensureFile} from "fs/mod.ts";

async function install(toml: ProgramAction, program: AppArgs) {
  INTERPOLATES.sourceloc = genSourceLoc(toml);
  info.info("interp " + INTERPOLATES.sourceloc);
  const fileloc = await getSourceFromWeb(toml);
  info.info("file " + fileloc);
  const decompressedFileLoc = await decompress(fileloc);




  info.info("decomp " + decompressedFileLoc);
}

export { install };
