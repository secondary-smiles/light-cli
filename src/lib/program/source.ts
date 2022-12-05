import { ProgramArgs } from "../cli/parseArgs.ts";
import { info } from "../util/info.ts";

function resolveSource(args: ProgramArgs) {
  getActionFile(args.source);
}

async function getActionFile(source: string) {
  const url = new URL(`https://${source}/light/action.toml`);
  info.log(await fetch(url));
}

export { resolveSource };
