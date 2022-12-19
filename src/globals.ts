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
  light_home_location: string;
  core_location: string;
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
  program_version: string; // TODO: Implement SemVer
}

const staticGlobals: StaticGlobals = {
  version: "0.0.1",
  light_home_location: Deno.env.get("HOME") + "/.light/light",
  core_location: Deno.env.get("HOME") + "/.light/light/light-core/www",
};

const parseGlobals: ParseGlobals = {
  never: false,
};

const commandGlobals: CommandGlobals = {
  verbose: false,
  silent: false,
  core: false,
  program_version: "",
};

const globals: Globals = {
  static: staticGlobals,
  parse: parseGlobals,
  command: commandGlobals,
};

export { globals };
