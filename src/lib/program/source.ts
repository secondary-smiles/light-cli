import { ProgramArgs } from "../cli/parseArgs.ts";
import { info } from "../util/info.ts";
import { error } from "../util/error.ts";
import { ACTION, NAME } from "../../globals.ts";

interface UrlGroup {
  preUrl?: URL;
  postUrl?: URL;
}

function resolveSource(args: ProgramArgs) {
  getActionFile(args.source);
}

// CHECKS:
// light.{{source}}/action.toml
// {{source}}/light/action.toml
async function getActionFile(source: string) {
  const url = getUrl(source);

  info.info(url);
}

function getUrl(source: string) {
  if (source.split(".").length < 2) {
    error(new Error(`${source} could not be parsed as URL`));
  }

  const postSourceUrlString = `https://${source}/${NAME}/${ACTION}`;
  const preSourceUrlString = `https://${NAME}.${source}/${ACTION}`;
  const postUrl = checkDomain(preSourceUrlString);
  const preUrl = checkDomain(postSourceUrlString);

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

export { resolveSource };
