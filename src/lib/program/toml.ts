export interface Action {
  provides: ProgramAction[];
}

export interface ProgramAction {
  name: string;
  source: string;
  dyn_version: boolean;
  def_ver: string;
  install: ProgramInstall;
}

export interface ProgramInstall {
  cmd: string;
  test: string;
}

// TODO Validate individual fields, not just their existence
function validAction(action: any) {
  if (!action.provides) {
    return new Error(`'provides' list not specified`);
  }

  let returnVal: boolean | Error = true;

  action.provides.forEach((program: ProgramAction) => {
    const valid = validProgramAction(program);

    if (valid instanceof Error) {
      returnVal =  new Error(`program invalid: ${valid.message}`);
    }
  });

  return returnVal;
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

export { validAction };
