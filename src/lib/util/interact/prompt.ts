import { logger } from "logger";

import { Prompt } from "./types.ts";

function promptUser(user_prompt: string, prompts: Prompt[]): boolean {
  logger.log(user_prompt);

  const option = prompt(">");
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
    return promptUser(`invalid option '${option}'\n${user_prompt}`, prompts);
  }

  return returnVal;
}

export { promptUser };
