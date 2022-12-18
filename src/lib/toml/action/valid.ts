function isAction(object: any) {
  if (!("provides" in object)) {
    return false;
  }

  if (!isMetadata(object.provides)) {
    return false;
  }

  if (!("dependencies" in object)) {
    object.dependencies = [];
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

  if (!(object.source instanceof URL)) {
    object.source = new URL(object.source);
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
