import { globals } from "globals";
import { logger } from "logger";

import { Prompt } from "./types.ts";

function promptUser(user_prompt: string, prompts: Prompt[]): boolean {
  if (globals.command.yes || globals.command.core) {
    return true;
  }

  logger.log(user_prompt);

  let option = prompt(">");
  option = option ? option : "";

  logger.clear(user_prompt.split("\n").length + 1);

  let returnVal = false;
  let recognized = false;

  prompts.forEach((opt) => {
    if (opt.key == option) {
      recognized = true;

      if (opt.run) {
        opt.run();
      }

      if (opt.recursive) {
        returnVal = promptUser(user_prompt, prompts);
      } else {
        returnVal = opt.resolve_to ? opt.resolve_to! : false;
      }
    }
  });

  if (!recognized) {
    returnVal = promptUser(user_prompt, prompts);
  }

  return returnVal;
}

export { promptUser };
