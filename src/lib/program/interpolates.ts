import { parse as parseToTOML } from "encoding/toml.ts";

import { INTERPOLATES } from "../../globals.ts";
import { Action } from "./toml.ts";
import { info } from "../util/info.ts";
import { error } from "../util/error.ts";

function interpolateVersion(data: string) {
  const rawToml = parseToTOML(data);
  if (!rawToml.provides) {
    error(new Error("invalid toml"));
  }

  const toml: Action = rawToml


  return data;
}

export { interpolateVersion };
