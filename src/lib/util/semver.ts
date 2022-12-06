import { error } from "./error.ts";

export class Semver {
  major: number;
  minor: number;
  patch: number;

  constructor(major: number, minor: number, patch: number) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }

  toString() {
    return `${this.major}.${this.minor}.${this.patch}`;
  }
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
