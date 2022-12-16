// Global variables for light at runtime
// Types
interface Globals {
  static: StaticGlobals;
}

// Version, name, urls. Things that can be static when compiled
interface StaticGlobals {
  version: string;
}

// globalThis extension
declare global {
  const app: Globals;
}

// Set parameters
globalThis.app.static.version = "0.0.1";
