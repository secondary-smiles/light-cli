import { logger } from "logger";
import { globals } from "globals";
import { Problem } from "error";

import { Link } from "lib/toml/provides/types.ts";
import { Action } from "lib/toml/action/types.ts";

import { fetchToml } from "lib/coordinate/net/fetchToml.ts";
import { fetchToml as netFetchToml } from "lib/remote/net/fetchToml.ts";

import { isAction } from "lib/toml/action/valid.ts";
import { interpolateAction } from "lib/toml/action/interpolates.ts";
import { isProvides } from "lib/toml/provides/valid.ts";
import { getLinkFromProvides } from "lib/toml/provides/util/links.ts";
import { Provides } from "lib/toml/provides/types.ts";

async function getActionFromLink(link: Link, explicit = true) {
  let actionData;
  if (explicit) {
    actionData = await fetchToml(link.source);
  } else {
    const provides = await netFetchToml(link.source);
    logger.verbose(provides);
    if (!isProvides(provides)) {
      throw new Problem("received provides file is invalid");
    }

    const this_link = getLinkFromProvides(
      provides as unknown as Provides,
      link.name
    );

    actionData = await netFetchToml(this_link.source);
  }

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
