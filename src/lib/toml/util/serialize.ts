import {parse as parseToml} from "encoding/toml.ts";
import {Problem} from "error"

function serializeToToml(data: string) {
    try {
        return parseToml(data);
    } catch (err) {
        throw new Problem(`invalid toml: ${err}`);
    }
}

export {serializeToToml}