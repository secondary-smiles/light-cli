import {blue, yellow, red} from "https://deno.land/std@0.111.0/fmt/colors.ts";

const info = {
    log(data: any) {
        console.log(data)
    },

    info(data: any) {
        console.info(blue("INFO: "), data)
    },

    warn(data: any) {
        console.warn(yellow("WARN: "), data)
    },

    error(data: any) {
        console.warn(red("ERR: "), data)
    }
}

export {info}