import { parse as parseToml } from "encoding/toml.ts";
import { Problem } from "error";

async function fetchToml(url: URL) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Problem(
      `got server response '${response.status}' from '${url.href}'`
    );
  }

  const data = await response.text();

  return serializeToToml(data);
}

function serializeToToml(data: string) {
  try {
    return parseToml(data);
  } catch (err) {
    throw new Problem(`invalid toml: ${err}`);
  }
}

export { fetchToml };
