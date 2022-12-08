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

  valid() {
    if (isNaN(this.major)) {
      return false;
    }

    if (isNaN(this.minor)) {
      return false;
    }

    if (isNaN(this.patch)) {
      return false;
    }

    return true;
  }

  biggerThan(that: Semver) {
    if (this.major > that.major) {
      return true;
    } else if (this.major < that.major) {
      return false
    }

    if (this.minor > that.minor) {
      return true;
    } else if (this.minor < that.minor) {
      return false
    }

    if (this.patch > that.patch) {
      return true;
    } else if (this.patch < that.patch) {
      return false
    }

    return true;
  }
}

function getSemver(data: string) {
  const parts = data.split(".");

  if (parts.length !== 3) {
    return new Error(`'${data}' cannot be parsed as semver`);
  }

  const version: Semver = new Semver(
    parseInt(parts[0], 10),
    parseInt(parts[1], 10),
    parseInt(parts[2], 10)
  );

  if (!version.valid()) {
    return new Error(`'${data}' cannot be parsed as semver`);
  }

  return version;
}

export { getSemver };
