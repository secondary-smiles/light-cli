import { error } from "./error.ts";

export interface Semver {
  major: number;
  minor: number;
  patch: number;
}

function getSemver(data: string) {
  const parts = data.split(".");

  if (parts.length !== 3) {
    error(new Error(`'${data}' cannot be parsed as semver`));
  }

  const version: Semver = {
    major: parseInt(parts[0], 10),
    minor: parseInt(parts[1], 10),
    patch: parseInt(parts[2], 10),
  };

  if (!version.major || !version.minor || !version.patch) {
    error(new Error(`'${data}' cannot be parsed as semver`));
  }

  console.log(version);
  return version;
}

export { getSemver };
