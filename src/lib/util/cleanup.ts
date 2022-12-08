import { COMMANDS, INTERPOLATES } from "../../globals.ts";
import { genSource } from "./file.ts";
import { error } from "./error.ts";
import { ProgramArgs } from "../cli/parseArgs.ts";

async function preclean() {
  if (!INTERPOLATES.baseloc) {
    genSource();
  }

  try {
    await Deno.remove(INTERPOLATES.baseloc, { recursive: true });
  } catch (_) {
    // Already clean
  }
}

async function postclean(program: ProgramArgs) {
  try {
    await Deno.remove(INTERPOLATES.baseloc, { recursive: true });
  } catch (err) {
    error(err);
  }

  if (COMMANDS.destroy) {
    const dirToRemove = `${INTERPOLATES.homeloc}/${program.source}/${program.program}/${INTERPOLATES.version}`;
    try {
      await Deno.remove(dirToRemove, { recursive: true });
    } catch (err) {
      error(err);
    }
  }
}

export { preclean, postclean };
