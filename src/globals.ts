// Global variables for light at runtime
// Types
interface Globals {
  static: StaticGlobals;
}

// Version, name, urls. Things that can be static when compiled
interface StaticGlobals {
  version: string;
}

const staticGlobals: StaticGlobals = {
  version: "0.0.1",
};

const globals: Globals = {
  static: staticGlobals,
};

export { globals };
