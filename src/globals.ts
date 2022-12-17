// Global variables for light at runtime
// Types
interface Globals {
  static: StaticGlobals;
  parse: ParseGlobals;
  command: CommandGlobals;
}

// Version, name, urls. Things that can be static when compiled
interface StaticGlobals {
  version: string;
}

// Things set while parsing
interface ParseGlobals {
  never: boolean;
}

// Globals that commands set
interface CommandGlobals {
  verbose: boolean;
  silent: boolean;
  core: boolean;
}

const staticGlobals: StaticGlobals = {
  version: "0.0.1",
};

const parseGlobals: ParseGlobals = {
  never: false,
};

const commandGlobals: CommandGlobals = {
  verbose: false,
  silent: false,
  core: false,
};

const globals: Globals = {
  static: staticGlobals,
  parse: parseGlobals,
  command: commandGlobals,
};

export { globals };
