import { ensureFile } from "fs/ensure_file.ts";
import { ProgramAction } from "../program/toml.ts";
import { error } from "../util/error.ts";
import { info } from "../util/info.ts";
import { bold, brightGreen, gray, red, cyan } from "fmt/colors.ts";
import { INTERPOLATES, MAXLENGTH } from "../../globals.ts";
import { highlightBash } from "../util/highlight.ts";
import { fileExists, genFinalBinloc } from "../util/file.ts";
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

  const prompt = `installing package '${bold(
    toml.name
  )}' requires an unverified bash script to be run.\n[${bold(
    brightGreen("R")
  )}]un, [${red("c")}]ancel, [${cyan("v")}]iew`;

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
      displayScript(toml);
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
        `[${bold(brightGreen("R"))}]un, [${red("c")}]ancel, [${cyan("v")}]iew`
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

  const process = await Deno.run(runOptions);
  const status = await process.status();

  if (!status.success) {
    error(new Error(`bash test script failed with status '${status.code}'`));
  } else {
    await Deno.remove(test_shloc);
  }
}

function displayScript(toml: ProgramAction) {
  const wordLength = toml.name.length;
  let nDashes = Math.max(0, MAXLENGTH - wordLength);

  if (nDashes % 2 != 0) {
    nDashes--;
  }

  const start = "+" + new Array(nDashes / 2).join("-");
  const end = new Array(nDashes / 2).join("-") + "+";

  const top = start + toml.name.toUpperCase() + end;
  const bottom = "+" + new Array(MAXLENGTH).join("-") + "+";
  info.log(gray(top));
  info.log(highlightBash(toml.install.cmd.trim()));
  info.log(gray(bottom));
}

async function installBinary(toml: ProgramAction, args: ProgramArgs) {
  INTERPOLATES.final_binloc = genFinalBinloc(toml, args);

  const binDirContents = await Deno.readDir(INTERPOLATES.binloc);
  let binDirLength = 0;
  let binName = "";
  for await (const item of binDirContents) {
    if (item.isFile) {
      binDirLength++;
      binName = item.name;
    }
  }

  if (binDirLength != 1) {
    const symbol = binDirLength > 1 ? "more" : "less";
    error(
      new Error(`found ${symbol} than one file in ${INTERPOLATES.final_binloc}`)
    );
  }

  const finalBinName = INTERPOLATES.final_binloc + "/" + toml.name;
  await ensureFile(finalBinName);

  await Deno.copyFile(INTERPOLATES.binloc + "/" + binName, finalBinName);

  if (!(await fileExists(finalBinName))) {
    error(new Error("program not copied successfully"));
  }

  return true;
}

export { runInstall, runTest, installBinary };