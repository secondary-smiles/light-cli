import { ensureFile } from "fs/ensure_file.ts";
import { ProgramAction } from "../program/toml.ts";
import { error } from "../util/error.ts";
import { info } from "../util/info.ts";
import { bold, brightGreen, gray, red, cyan } from "fmt/colors.ts";
import { COMMANDS, INTERPOLATES, MAXLENGTH } from "../../globals.ts";
import { highlightBash } from "../util/highlight.ts";
import { pathExists, genFinalBinloc } from "../util/file.ts";
import { ProgramArgs } from "../cli/parseArgs.ts";

async function runInstall(toml: ProgramAction, loc: string) {
  await Deno.chdir(loc);

  const install_shloc = loc + "/light-setup";
  await ensureFile(install_shloc);

  await Deno.writeTextFile(install_shloc, toml.install.cmd);

  const runOptions: Deno.RunOptions = {
    cwd: loc,
    cmd: ["/bin/bash", install_shloc],
    stdin: "null",
    stdout: "null",
    stderr: "null",
  };

  // Pause loader
  info.stopLoad();

  const prompt = `installing package '${bold(
    toml.name
  )}' requires an unverified bash script to be run.\n[${bold(
    brightGreen("R")
  )}]un, [${red("c")}]ancel, [${cyan("v")}]iew`;

  if (!promptContinue(toml, toml.install.cmd, prompt)) {
    error(new Error("install cancelled"));
  }

  info.resumeLoad();
  // CWD Won't load without pausing for some reason sometimes
  await new Promise(resolve => setTimeout(resolve, 100));

  const process = Deno.run(runOptions);
  const status = await process.status();

  if (!status.success) {
    error(new Error(`bash install script failed with status '${status.code}'`));
  }
  info.resumeLoad();
}

function promptContinue(
  toml: ProgramAction,
  viewText: string,
  promptString = ""
): boolean {
  if (COMMANDS.yes || COMMANDS.core) {
    return true;
  }

  info.log(promptString);
  let action = prompt("> ");
  // Trim, resolve null, and toLower
  action = action ? action.trim().toLowerCase() : "";
  info.clearLines(3);

  switch (action) {
    case "c":
      return false;
    case "v":
      displayScript(toml, viewText);
      return promptContinue(
        toml,
        viewText,
        `Select an option\n[${bold(brightGreen("R"))}]un, [${red("c")}]ancel`
      );
    case "r":
      return true;
    case "":
      return true;
    default:
      return promptContinue(
        toml,
        viewText,
        `Unrecognized selection '${action}'\n[${bold(
          brightGreen("R")
        )}]un, [${red("c")}]ancel, [${cyan("v")}]iew`
      );
  }
}

async function runTest(toml: ProgramAction, loc: string) {
  await Deno.chdir(loc);

  const test_shloc = loc + "/light-test";
  await ensureFile(test_shloc);

  await Deno.writeTextFile(test_shloc, toml.install.test);

  const runOptions: Deno.RunOptions = {
    cwd: loc,
    cmd: ["/bin/bash", test_shloc],
    stdin: "null",
    stdout: "null",
    stderr: "null",
  };

  info.stopLoad();

  const prompt = `testing package '${bold(
    toml.name
  )}' requires an unverified bash script to be run.\n[${bold(
    brightGreen("R")
  )}]un, [${red("c")}]ancel, [${cyan("v")}]iew`;

  if (!promptContinue(toml, toml.install.test, prompt)) {
    error(new Error("test cancelled"));
  }

  info.resumeLoad();

  const process = await Deno.run(runOptions);
  const status = await process.status();

  if (!status.success) {
    error(new Error(`bash test script failed with status '${status.code}'`));
  } else {
    await Deno.remove(test_shloc);
  }
}

function displayScript(toml: ProgramAction, view: string) {
  const wordLength = toml.name.length;
  let nDashes = Math.max(0, MAXLENGTH - wordLength);

  if (nDashes % 2 != 0) {
    nDashes--;
  }

  const start = "+" + new Array(nDashes / 2).join("-");
  const end = new Array(nDashes / 2).join("-") + "+";

  const top = start + toml.name.toUpperCase() + end;
  const bottom = "+" + new Array(MAXLENGTH - 1).join("-") + "+";
  info.log(gray(top));
  info.log(highlightBash(view.trim()));
  info.log(gray(bottom));
  alert("");

  view.split("\r\n").join("\n");
  const lines = view.trim().split("\n");
  info.clearLines(lines.length + 3);
}

async function installBinary(toml: ProgramAction, args: ProgramArgs) {
  INTERPOLATES.final_binloc = genFinalBinloc(toml, args);

  if (!(await pathExists(INTERPOLATES.binloc + "/" + toml.name))) {
    error(
      new Error(
        `Could not find binary named ${toml.name} at ${INTERPOLATES.binloc}`
      )
    );
  }

  const finalBinName = INTERPOLATES.final_binloc + "/" + toml.name;
  await ensureFile(finalBinName);

  await Deno.copyFile(INTERPOLATES.binloc + "/" + toml.name, finalBinName);

  if (!(await pathExists(finalBinName))) {
    error(new Error("program not copied successfully"));
  }

  return true;
}

export { runInstall, runTest, installBinary };
