export interface Action {
  provides?: ProgramAction[];
}

export interface ProgramAction {
  name: string;
  source: string;
  dyn_version?: boolean;
  def_ver: string;
  install: ProgramInstall;
}

export interface ProgramInstall {
  cmd: string;
  test?: string;
}
