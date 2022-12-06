export interface Action {
  provides?: ProgramAction[];
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

function validAction(action: Action) {
  if (!action.provides) {
    return new Error(`'provides' list not specified`);
  }

  action.provides.forEach((program) => {
    const valid = validProgramAction(program);
    if (!valid) {
      return new Error(`program invalid: ${valid}`);
    }
  });

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
  if (!isValidInstall) {
    return new Error(`invalid install: ${isValidInstall}`);
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
