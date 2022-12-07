import { ProgramArgs } from "../cli/parseArgs.ts";
import { info } from "../util/info.ts";
import { error } from "../util/error.ts";
import { PROVIDES, NAME, TIMEOUT, ACTION } from "../../globals.ts";

import { parse as parseToTOML } from "encoding/toml.ts";
import {Action, ProgramAction, Provide, validAction, validLink, validProvides} from "./toml.ts";

interface UrlGroup {
  preUrl?: URL;
  postUrl?: URL;
}

async function resolveSource(args: ProgramArgs) {
  return await getProvidesFile(args.source).catch((err) => {
    error(err);
  });
}

async function followSymlink(source: string) {
  const url: URL | undefined = checkDomain(source);
  if (!url) {
    error(new Error(`cannot construct url from ${source}`));
  }

  const data = await textFetchWrapper(url);

  const toml: Action | unknown = parseToTOML(data);

  const isValidToml = validAction(toml);

  if (isValidToml instanceof Error) {
    error(isValidToml)
  }

  if (!toml || !instanceOfAction(toml)) {
    error(new Error("critical toml parse failure"))
  }

  return toml;
}

// CHECKS:
// light.{{source}}/provides.toml
// {{source}}/light/provides.toml
async function getProvidesFile(source: string) {
  const urlGroup = getUrl(source);
  const data = await getFileFromUrlGroup(urlGroup);

  // Timout requests now that we have our data
  dispatchEvent(new Event("textFetchTimeout"));

  const toml: Provide | unknown = parseToTOML(data);

  const isValidToml = validProvides(toml);

  if (isValidToml instanceof Error) {
    error(isValidToml);
  }

  if (!instanceOfProvides(toml)) {
    error(new Error("toml critical parse failure"));
  }

  return toml;
}

function instanceOfAction(object: any): object is Action {
  return "provides" in object;
}

function instanceOfProvides(object: any): object is Provide {
  return "provides" in object;
}

function getUrl(source: string) {
  if (source.split(".").length < 2) {
    error(new Error(`${source} could not be parsed as URL`));
  }

  const postSourceUrlString = `https://${source}/${NAME}/${PROVIDES}`;
  const preSourceUrlString = `https://${NAME}.${source}/${PROVIDES}`;
  const preUrl = checkDomain(preSourceUrlString);
  const postUrl = checkDomain(postSourceUrlString);

  if (!preUrl && !postUrl) {
    error(new Error(`${source} could not be parsed as URL`));
  }

  const urlGroup: UrlGroup = {
    preUrl: preUrl,
    postUrl: postUrl,
  };

  return urlGroup;
}

function checkDomain(source: string) {
  let url: URL | undefined;
  try {
    url = new URL(source);
  } catch (e) {
    info.warn(e.message);
  }
  return url;
}

async function getFileFromUrlGroup(urlGroup: UrlGroup) {
  const promises = [];
  if (urlGroup.preUrl) {
    promises.push(textFetchWrapper(urlGroup.preUrl));
  }

  if (urlGroup.postUrl) {
    promises.push(textFetchWrapper(urlGroup.postUrl));
  }

  const data = await Promise.any(promises).catch(() => {
    error(
      new Error(
        `could not fetch file, try making sure '${urlGroup.postUrl?.hostname}' is a valid source`
      )
    );
  });

  return await data;
}

async function textFetchWrapper(url: URL) {
  const controller = new AbortController();

  addEventListener("textFetchTimeout", () => {
    // clearTimeout(timeoutHandle);
    controller.abort("request too slow");
  });

  // const timeoutHandle = setTimeout(() => {
  //   controller.abort("request timed out");
  // }, TIMEOUT);

  const res = await fetch(url, { signal: controller.signal }).catch((err) => {
    return Promise.reject(err);
  });

  if (!res.ok) {
    return Promise.reject("invalid server response");
  }

  // Returns a promise
  return res.text();
}

export { resolveSource, checkDomain, followSymlink };
