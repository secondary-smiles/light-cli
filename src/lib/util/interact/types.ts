interface Prompt {
  key: string;
  run?: Function;
  recursive: boolean;
  resolve_to?: boolean;
}

export type { Prompt };
