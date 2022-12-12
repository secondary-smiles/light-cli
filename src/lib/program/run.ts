import { ProgramArgs } from "../cli/parseArgs.ts";
import { INTERPOLATES } from "../../globals.ts";

async function runProgram(program: ProgramArgs, location=INTERPOLATES.final_binloc) {
  const loc = location + "/";
  const runOptions: Deno.RunOptions = {
    cwd: Deno.cwd(),
    cmd: [loc + program.program, ...program.args],
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  };

  const process = await Deno.run(runOptions);

  return await process.status();
}

export { runProgram };
