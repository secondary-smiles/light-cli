import { ProgramArgs } from "../cli/parseArgs.ts";
import { info } from "../util/info.ts";
import { error } from "../util/error.ts";
import { ACTION, NAME, TIMEOUT } from "../../globals.ts";

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
  const urlGroup = getUrl(source);
  const data = await getActionFileFromUrlGroup(urlGroup);

  info.log(data);
  // Timout requests now that we have our data
  dispatchEvent(new Event("timeout"));
}

function getUrl(source: string) {
  if (source.split(".").length < 2) {
    error(new Error(`${source} could not be parsed as URL`));
  }

  const postSourceUrlString = `https://${source}/${NAME}/${ACTION}`;
  const preSourceUrlString = `https://${NAME}.${source}/${ACTION}`;
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

async function getActionFileFromUrlGroup(urlGroup: UrlGroup) {
  const promises = [];
  if (urlGroup.preUrl) {
    promises.push(fetchWrapper(urlGroup.preUrl));
  }

  if (urlGroup.postUrl) {
    promises.push(fetchWrapper(urlGroup.postUrl));
  }

  const data = await Promise.any(promises).catch(() => {
    error(
      new Error(
        `could not fetch action.toml, try making sure '${urlGroup.postUrl?.hostname}' is a valid source`
      )
    );
  });

  return await data;
}

async function fetchWrapper(url: URL) {
  const controller = new AbortController();

  addEventListener("timeout", () => {
    clearTimeout(timeoutHandle);
    controller.abort("request too slow");
  });

  const timeoutHandle = setTimeout(() => {
    controller.abort("request timed out");
  }, TIMEOUT);

  const res = await fetch(url, { signal: controller.signal }).catch((err) => {
    return Promise.reject(err);
  });

  // Returns a promise
  return res.text();
}

export { resolveSource };
