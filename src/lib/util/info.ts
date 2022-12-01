import {blue, yellow, red, bold} from "fmt/colors.ts";

const info = {
    log(data: any) {
        console.log(data);
    },

    info(data: any) {
        console.info(bold(blue("INFO: ")), data);
    },

    warn(data: any) {
        console.warn(bold(yellow("WARN: ")), data);
    },

    error(data: any) {
        console.warn(bold(red("ERR: ")), data);
    }
}

export {info}