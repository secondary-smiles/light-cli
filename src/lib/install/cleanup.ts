import { INTERPOLATES } from "../../globals.ts";
import { error } from "../util/error.ts";

async function cleanup() {
  try {
    await Deno.remove(INTERPOLATES.baseloc, { recursive: true });
  } catch (err) {
    error(err);
  }
}

export { cleanup };
