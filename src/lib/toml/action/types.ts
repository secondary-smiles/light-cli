import { Link } from "lib/toml/provides/types.ts";

interface Action {
  provides: Metadata;
  dependencies: Link[];
}

interface Metadata {
  name: string;
  author: string;
  description: string;
  dynamic: boolean;
  default: string;
  source: string;
  install: ActionInstall;
}

interface ActionInstall {
  cmd: string;
  test: string;
}

export type { Action, Metadata, ActionInstall };
