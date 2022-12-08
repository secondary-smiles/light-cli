import { ensureFile } from "fs/mod.ts";
import { checkDomain } from "../program/source.ts";
import { error } from "../util/error.ts";
import { INTERPOLATES } from "../../globals.ts";
import {ProgramAction} from "../program/toml.ts";

async function getSourceFromWeb(toml: ProgramAction) {
  const url = checkDomain(toml.source);
  if (!url) {
    error(new Error(`'${toml.source}' cannot be parsed as a URL`));
  }

  const res = await fetch(url!);

  if (!res.ok) {
    error(new Error(`invalid server response from '${url.href}'`));
  }

  let fileLoc = `${INTERPOLATES.sourceloc}/source`;
  await ensureFile(fileLoc);
  const file = await Deno.open(fileLoc, {
    create: true,
    write: true,
  });

  await res.body?.pipeTo(file.writable);

  try {
    file.close()
  } catch (err) {
    // discard error for now TODO
    // info.warn(err)
  }

  return fileLoc;
}

export { getSourceFromWeb };
