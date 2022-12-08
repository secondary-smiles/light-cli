import { ProgramArgs } from "../cli/parseArgs.ts";
import { INTERPOLATES } from "../../globals.ts";

async function runProgram(program: ProgramArgs) {
  const runOptions: Deno.RunOptions = {
    cwd: INTERPOLATES.final_binloc,
    cmd: ["./" + program.program, ...program.args],
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  };

  await Deno.run(runOptions);
}

export { runProgram };
