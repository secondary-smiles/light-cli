import { Link } from "./types.ts";

function isProvides(object: any) {
  if ("provides" in object && object.provides instanceof Array<Link>) {
    return true;
  }
  return false;
}

export { isProvides };
