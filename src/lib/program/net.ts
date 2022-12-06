import {checkDomain} from "./source.ts";
import {info} from "../util/info.ts";

async function getFileFromWeb(source: string) {
    const url = checkDomain(source);
    info.log(url);
}