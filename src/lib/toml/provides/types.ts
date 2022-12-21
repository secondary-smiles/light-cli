interface Provides {
  provides: Link[];
}

interface Link {
  name: string;
  source: string;
  version?: string;
}

export type { Provides, Link };
