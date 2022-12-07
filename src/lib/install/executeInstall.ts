import { ensureFile } from "fs/ensure_file.ts";
import { ProgramAction } from "../program/toml.ts";
import { error } from "../util/error.ts";
import { info } from "../util/info.ts";
import { blue, bold, brightGreen, red } from "fmt/colors.ts";

async function runInstall(toml: ProgramAction, loc: string) {
  await Deno.chdir(loc);

  const install_shloc = loc + "/light-setup.sh";
  await ensureFile(install_shloc);

  await Deno.writeTextFile(install_shloc, toml.install.cmd);

  const runOptions: Deno.RunOptions = {
    cwd: loc,
    cmd: ["/bin/bash", install_shloc],
    stdin: "inherit",
    stdout: "piped",
    stderr: "piped",
  };

  const prompt = `installing package '${bold(
    toml.name
  )}' requires a bash script to be run.\n[${bold(brightGreen("R"))}]un, [${red(
    "c"
  )}]ancel, [${blue("v")}]iew`;

  if (!promptContinue(toml, prompt)) {
    error(new Error("install cancelled"));
  }

  const process = Deno.run(runOptions);
  const status = await process.status();

  if (!status.success) {
    error(new Error(`bash install script failed with status '${status.code}'`));
  }
}

function promptContinue(toml: ProgramAction, promptString = ""): boolean {
  info.log(promptString);
  let action = prompt("> ");
  // Trim, resolve null, and toLower
  action = action ? action.trim().toLowerCase() : "";

  switch (action) {
    case "c":
      return false;
    case "v":
      displayScript();
      return promptContinue(
        toml,
        `[${bold(brightGreen("R"))}]un, [${red("c")}]ancel`
      );
    case "r":
      return true;
    case "":
      return true;
    default:
      return promptContinue(
        toml,
        `[${bold(brightGreen("R"))}]un, [${red("c")}]ancel, [${blue("v")}]iew`
      );
  }
}

function displayScript() {
  info.warn("TODO");
}

export { runInstall };
