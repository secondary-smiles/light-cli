// Global variables for light at runtime
// Types
interface Globals {
  static: StaticGlobals;
  parse: ParseGlobals;
  command: CommandGlobals;
}

// Version, name, urls. Things that can be static when compiled
interface StaticGlobals {
  app_version: string;
  light_home_location: string;
  core_location: string;
  wd_install_location: string;
  wd_location: string;
}

// Things set while parsing
interface ParseGlobals {
  never: boolean;
  run_output: number | "null" | "inherit" | "piped" | undefined;
  interpolated_version: string; // TODO SemVer
  interpolated_sourceloc: string;
  interpolated_binloc: string;
  interpolated_this_program: string;
}

// Globals that commands set
interface CommandGlobals {
  verbose: boolean;
  silent: boolean;
  core: boolean;
  program_version: string; // TODO: Implement SemVer
}

const staticGlobals: StaticGlobals = {
  app_version: "0.0.1",
  light_home_location: Deno.env.get("HOME") + "/.light/light",
  core_location: Deno.env.get("HOME") + "/.light/light/light-core/www",
  wd_location: Deno.env.get("HOME") + "/.light",
  wd_install_location: Deno.env.get("HOME") + "/.light/light/d",
};

const parseGlobals: ParseGlobals = {
  never: false,
  run_output: "null",
  interpolated_version: "",
  interpolated_sourceloc: "",
  interpolated_binloc: "",
  interpolated_this_program: "",
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
