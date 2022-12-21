import { logger } from "logger";
import { globals } from "globals";
import { Problem } from "error";

import { Program } from "lib/cli/parse/types.ts";
import { pathExists } from "lib/file/exists.ts";

async function runProgram(program: Program) {
  const programloc = `${globals.static.wd_location}/${program.program.source}/${program.program.program}/${globals.parse.interpolated_version}`;
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
    cwd: Deno.cwd(),
    cmd: [
      `${globals.parse.final_bin_location}/${program.program.program}`,
      ...program.program.args,
    ],
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  };

  const process = await Deno.run(command);
  const status = await process.status();
  logger.verbose(status);

  return status;
}

export { runProgram };
