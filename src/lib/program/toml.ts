export interface Provide {
  provides: ProgramSymlink[];
}

export interface ProgramSymlink {
  name: string;
  source: string;
}

export interface Action {
  provides: ProgramAction;
}

export interface ProgramAction {
  name: string;
  author: string;
  description: string;
  source: string;
  dyn_version: boolean;
  def_ver: string;
  install: ProgramInstall;
  dependencies: ProgramDependency[];
}

export interface ProgramInstall {
  cmd: string;
  test: string;
}

export interface ProgramDependency {
  name: string;
  version?: string;
  source: string;
}

function validProvides(provides: any) {
  if (!provides.provides) {
    return new Error("missing provides");
  }

  let returnVal: boolean | Error = true;
  provides.provides.forEach((link: ProgramSymlink) => {
    const isValidLink = validLink(link);
    if (isValidLink instanceof Error) {
      returnVal = new Error(`invalid link: ${isValidLink.message}`);
    }
  });

  return returnVal;
}

function validLink(link: ProgramSymlink) {
  if (!link.name) {
    return new Error("missing name");
  }

  if (!link.source) {
    return new Error("missing source");
  }

  return true;
}

// TODO Validate individual fields, not just their existence
function validAction(action: any) {
  if (!action.provides) {
    return new Error("missing provides");
  }

  const validProgram = validProgramAction(action.provides);
  if (validProgram instanceof Error) {
    return new Error(`invalid provides: ${validProgram.message}`);
  }

  return true;
}

function validProgramAction(program: ProgramAction) {
  if (!program.name) {
    return new Error(`name not specified`);
  }

  if (!program.dyn_version) {
    program.dyn_version = false;
  }

  if (!program.def_ver) {
    return new Error(`default version not specified`);
  }

  if (!program.source) {
    return new Error(`source not specified`);
  }

  const isValidInstall = validInstall(program.install);
  if (isValidInstall instanceof Error) {
    return new Error(`invalid install: ${isValidInstall.message}`);
  }

  return true;
}

function validInstall(install: ProgramInstall) {
  if (!install.cmd) {
    return new Error(`cmd not specified`);
  }

  if (!install.test) {
    install.test = "";
  }

  return true;
}

export { validAction, validLink, validProvides };
