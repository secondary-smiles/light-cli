import { Provides, Link } from "lib/toml/provides/types.ts";
import {Problem} from "error";

function getLinkFromProvides(provides: Provides, program: string) {
    for (const link of provides.provides) {
        if (link.name == program) {
            return link;
        }
    }

    throw new Problem(`source does not provide program '${program}'`)
}

export { getLinkFromProvides };
