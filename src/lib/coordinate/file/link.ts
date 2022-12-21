import { logger } from "logger";
import { globals } from "globals";
import { Problem } from "error";

import { Link } from "lib/toml/provides/types.ts";
import { Action } from "lib/toml/action/types.ts";

import { fetchToml } from "lib/coordinate/net/fetchToml.ts";
import { isAction } from "lib/toml/action/valid.ts";
import { interpolateAction } from "lib/toml/action/interpolates.ts";

async function getActionFromLink(link: Link) {
  const actionData = await fetchToml(link.source);
  logger.verbose(actionData);
  if (!isAction(actionData)) {
    throw new Problem("received action file is invalid");
  }

  let action: Action = actionData as unknown as Action;

  globals.command.program_version = link.version ? link.version : "";

  action = interpolateAction(action);

  return action;
}

export { getActionFromLink };
