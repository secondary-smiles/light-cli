import { logger } from "logger";

function preprocessUrl(url: string, default_file = "provides.toml") {
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
    return new URL("https://" + url + `/light/${default_file}`);
  }
}

export { preprocessUrl };
