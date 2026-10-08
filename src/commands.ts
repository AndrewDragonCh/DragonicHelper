export type Command = {
  name: string;
  trigger: string[];
  response: string | (() => string | Promise<string>);
};

export const commands: Command[] = [
  {
    name: "Computer Specs",
    trigger: ["specs", "pc", "computer", "setup"],
    response: "https://thisisandrews.link/pc",
  },
  {
    name: "Headphones",
    trigger: ["headphones", "headset", "inears", "iems"],
    response: "Beyerdynamic DT-900 Pro X, Linsoul 7Hz x Crinacle Zero:2",
  },
  {
    name: "microphone",
    trigger: ["mic", "microphone"],
    response:
      "Audio Technica AT2035. Interface is a Behringer U-PHORIA UMC1820.",
  },
  {
    name: "mouse",
    trigger: ["mouse"],
    response: "Razer Viper V3 Pro",
  },
  {
    name: "keyboard",
    trigger: ["keyboard", "kb"],
    response: "Asus ROG Strix Scope II 96",
  },
  {
    name: "monitor",
    trigger: ["monitor", "display"],
    response:
      "Main is a Dell Alienware AW3225QF 4k 240hz. Second is an Acer XF273 S 1080p 165hz. Third is a generic Dell 1080p 60hz mounted vertically.",
  },
  {
    name: "mousepad",
    trigger: ["mousepad"],
    response: "SteelSeries QcK XL Performance Speed",
  },
];

export function findCommand(text: string): Command | undefined {
  const lower = text.toLowerCase().trim();

  return commands.find((cmd) =>
    cmd.trigger.some((t) => lower === t || lower === `!${t}`),
  );
}
