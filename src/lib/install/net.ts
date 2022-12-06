import {checkDomain} from "../program/source.ts";
import {info} from "../util/info.ts";

async function getSourceFromWeb(source: string) {
    const url = checkDomain(source);
    info.log(url);
}

export {getSourceFromWeb}