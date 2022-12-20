import {logger} from "logger";

import { Prompt } from "lib/util/interact/types.ts";
import { promptUser } from "lib/util/interact/prompt.ts";

async function runAsBash(cwd: string, bash: string) {
  // console.log(cwd);
  // console.log(bash);

  // Define options
  const run: Prompt = {
    key: "r",
    recursive: false,
    resolve_to: true,
  };

  const cancel: Prompt = {
    key: "c",
    recursive: false,
    resolve_to: false,
  };

  const view: Prompt = {
    key: "v",
    run: () => {console.log("viewing")},
    recursive: true,
  };

  const option = promptUser("program requires running an untested bash script\n[r]un, [c]ancel, [v]iew", [run, cancel, view]);
  logger.log(option)
}

export { runAsBash };
