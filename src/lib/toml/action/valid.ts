import { Link } from "lib/toml/provides/types.ts";
import { isLink } from "../provides/valid.ts";

function isAction(object: any) {
  if (!("provides" in object)) {
    return false;
  }

  if (!isMetadata(object.provides)) {
    return false;
  }

  if (!("dependencies" in object)) {
    object.dependencies = [];
  } else {
    let returnVal = true;
    object.dependencies.forEach((link: Link) => {
      if (!isLink(link)) {
        returnVal = false;
      }
    });
    if (!returnVal) {
      return returnVal;
    }
  }

  return true;
}

function isMetadata(object: any) {
  if (!("name" in object)) {
    return false;
  }

  if (!("author" in object)) {
    object.author = "";
  }

  if (!("description" in object)) {
    object.description = "";
  }

  if (!("dynamic" in object)) {
    return false;
  }

  if (!("default" in object)) {
    return false;
  }

  if (!("source" in object)) {
    return false;
  }

  if (!("install" in object)) {
    return false;
  }

  if (!isInstall(object.install)) {
    return false;
  }

  return true;
}

function isInstall(object: any) {
  if (!("cmd" in object)) {
    return false;
  }

  if (!("test" in object)) {
    object.test = "";
  }

  return true;
}

export { isAction };
