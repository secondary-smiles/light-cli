import {info} from "./info.ts";
function error(data: any, code=1) {
    info.error(data);
    Deno.exit(code)
}

export {error}