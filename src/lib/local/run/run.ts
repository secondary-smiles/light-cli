import { logger } from "logger";
import { globals } from "globals";
import { Problem } from "error";

import { Program } from "lib/cli/parse/types.ts";
import { Action } from "lib/toml/action/types.ts";
import { pathExists } from "lib/file/exists.ts";

async function runProgram(program: Program, action: Action) {
  const programloc = `${globals.static.wd_location}/${program.program.source}/${action.provides.name}/${globals.parse.interpolated_version}`;
  logger.verbose(programloc);

  if (!(await pathExists(programloc + `/${program.program.program}`))) {
    throw new Problem(
      `'${program.program.program} v${
        globals.parse.interpolated_version
      }' does not exist at location ${
        programloc + `/${program.program.program}`
      }`
    );
  }

  const command: Deno.RunOptions = {
    cwd: programloc,
    cmd: [`./${program.program.program}`, ...program.program.args],
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  };

  const process = await Deno.run(command);
  const status = await process.status();

  evalRun(status);
}

function evalRun(status: Deno.ProcessStatus) {
  if (!status.success) {
    Deno.exit(status.code);
  }
}

export { runProgram };
