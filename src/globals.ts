// Global variables for light at runtime
// Types
interface Globals {
  static: StaticGlobals;
  parse: ParseGlobals;
}

// Version, name, urls. Things that can be static when compiled
interface StaticGlobals {
  version: string;
}

// Things set while parsing
interface ParseGlobals {
  never: boolean;
}

const staticGlobals: StaticGlobals = {
  version: "0.0.1",
};

const parseGlobals: ParseGlobals = {
  never: false,
};

const globals: Globals = {
  static: staticGlobals,
  parse: parseGlobals,
};

export { globals };
