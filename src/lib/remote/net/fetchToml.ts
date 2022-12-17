import { parse as parseToml } from "encoding/toml.ts";
import { Problem } from "error";
import { logger } from "logger";
import { globals } from "globals";

async function fetchToml(source: string) {
  const url = preprocessUrl(source);
  logger.load(`fetching ${url.href}`)
  logger.verbose(url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Problem(
      `got server response '${response.status}' from '${url.href}'`
    );
  }

  const data = await response.text();

  return serializeToToml(data);
}

function serializeToToml(data: string) {
  try {
    return parseToml(data);
  } catch (err) {
    throw new Problem(`invalid toml: ${err}`);
  }
}

function preprocessUrl(url: string) {
  if (url.startsWith("http://")) {
    logger.warn("http is not supported, replacing with https");
    url = url.replace("http://", "https://");
  }

  // Do many things here in the future
  if (url.startsWith("https://")) {
    return new URL(url);
  } else if (url.split("/").length > 1) {
    return new URL("https://" + url);
  } else {
    return new URL("https://" + url + "/" + globals.static.provides_default);
  }
}

export { fetchToml };
