import { CommandGroup } from "lib/cli/parse/types.ts";

function runCommands(commands: CommandGroup[]) {
  commands.forEach((commandGroup) => {
    commandGroup.command.run(commandGroup.flag);
  });
}

export { runCommands };
