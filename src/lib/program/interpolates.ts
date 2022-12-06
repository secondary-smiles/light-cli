import { parse as parseToTOML } from "encoding/toml.ts";

import {COMMANDS, INTERPOLATES} from "../../globals.ts";
import { Action } from "./toml.ts";
import { info } from "../util/info.ts";
import { error } from "../util/error.ts";

function interpolateVersion(toml: Action) {
  toml.provides!.forEach(program => {
    info.info(program);
  })
}

export { interpolateVersion };
