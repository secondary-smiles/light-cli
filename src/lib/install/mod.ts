import { ProgramAction } from "../program/toml.ts";
import { AppArgs } from "../cli/parseArgs.ts";
import { getSourceFromWeb } from "./net.ts";
import { INTERPOLATES } from "../../globals.ts";
import { genSourceLoc } from "../util/file.ts";
import {decompress} from "./compress.ts";

async function install(toml: ProgramAction, program: AppArgs) {
  INTERPOLATES.sourceloc = genSourceLoc(toml);
  const fileloc = await getSourceFromWeb(toml);
  const decompressedFile = await decompress(fileloc, toml.compress);
}

export { install };
