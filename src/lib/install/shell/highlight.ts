import { bold, brightYellow, cyan, green } from "fmt/colors.ts";

function highlightBash(data: string) {
  data.split("\r\n").join("\n");
  const lines = data.split("\n");

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i] + " ";

    line = highlightFirstWord(line);
    line = highlightQuotes(line);
    line = highlightChars(line, ["<", ">"]);
    line = highlightChars(line, ["*", "?", " . "], cyan);

    lines[i] = line;
  }

  return lines.join("\n");
}

function highlightFirstWord(line: string) {
  const words = line.split(" ");
  words[0] = bold(green(words[0]));
  return words.join(" ");
}

function highlightChars(
  line: string,
  chars: string[],
  color: Function = brightYellow
) {
  chars.forEach((char) => {
    line = line.split(char).join(color(char));
  });

  return line;
}

function highlightQuotes(line: string) {
  line = colorBetween(line, '"');
  line = colorBetween(line, "'");

  return line;
}

function colorBetween(
  line: string,
  char: string,
  colorFn: Function = brightYellow
) {
  const doubleQuoteSegments = line.split(char);

  let boost = 0;
  if (!line.startsWith(char)) {
    boost = 1;
  }

  doubleQuoteSegments.forEach((segment, index) => {
    if ((index + boost) % 2 == 0) {
      doubleQuoteSegments[index] = colorFn(segment);
    }
  });

  return doubleQuoteSegments.join(colorFn(char));
}

export { highlightBash };
