import { Link } from "lib/toml/provides/types.ts";

interface Action {
  provides: string;
  dependencies: Link[];
}

interface Metadata {
  name: string;
  author?: string;
  description?: string;
  dynamic: boolean;
  default: string;
  source: URL;
  install: ActionInstall;
}

interface ActionInstall {
  install: string;
  test?: string;
}

export type { Action, Metadata, ActionInstall };
