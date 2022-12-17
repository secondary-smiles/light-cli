import { Link } from "./types.ts";

function isProvides(object: any) {
  if (!("provides" in object && object.provides instanceof Array)) {
    return false;
  }

  let validLinks = true;
  object.provides.forEach((link: Link) => {
    if (!isLink(link)) {
      validLinks = false;
    }
  });

  return validLinks;
}

function isLink(object: any) {
  if (!("name" in object)) {
    return false;
  }

  if (!("source" in object)) {
    return false;
  }

  return true;
}

export { isProvides };
