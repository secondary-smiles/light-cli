import { logger } from "logger";

import { gray } from "fmt/colors.ts";

function displayBashScript(title: string, script: string) {
  const lineLength = 41;

  let topLength = Math.max(0, lineLength - title.length);
  if (topLength % 2 != 0) topLength++;

  const top =
    "+" +
    new Array(topLength / 2).join("-") +
    title +
    new Array(topLength / 2).join("-") +
    "+";

  const bottom = "+" + new Array(lineLength).join("-") + "+";

  logger.log(gray(top));
  logger.log(script.trim());
  logger.log(gray(bottom));

  alert("");
  logger.clear(script.trim().split("\n").length + 3);
}

export { displayBashScript };
