import { INTERPOLATES } from "../../globals.ts";
import { genSource } from "../util/file.ts";

async function cleanup() {
  if (!INTERPOLATES.baseloc) {
    genSource();
  }

  try {
    await Deno.remove(INTERPOLATES.baseloc, { recursive: true });
  } catch (_err) {
    //TODO: Clever error distinguishing
    // error(_err);
  }
}

export { cleanup };
