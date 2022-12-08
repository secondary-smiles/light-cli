import { AppArgs, ProgramArgs } from "../cli/parseArgs.ts";
import { COMMANDS, INTERPOLATES } from "../../globals.ts";
import { genHome } from "../util/file.ts";
import { getSemver, Semver } from "../util/semver.ts";

async function isCached(program: AppArgs) {
  genHome();

  let searchPath = `${INTERPOLATES.homeloc}/${program.programArgs!.source}/${
    program.programArgs!.program
  }`;

  if (COMMANDS.version) {
    searchPath += `/${COMMANDS.version.toString()}`;
  } else {
    const newestVersion = await getNewestVersion(searchPath);
    if (!newestVersion) {
      // Cache doesn't exist
      return false;
    }

    INTERPOLATES.version = newestVersion;
    searchPath += "/" + newestVersion;
  }

  return searchPath;
}

async function getNewestVersion(base: string) {
  try {
    const dirListing = await Deno.readDir(base);

    let cmpVer = new Semver(0, 0, 0);

    for await (const file of dirListing) {
      if (file.isDirectory) {
        const version = getSemver(file.name);

        if (!(version instanceof Error) && version.biggerThan(cmpVer)) {
          cmpVer = version;
        }
      }
    }

    return cmpVer.toString();
  } catch (_) {
    //TODO: Log error or something
    return false;
  }
}

export { isCached };
