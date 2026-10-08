import tmi from "@tmi.js/chat";
import { commands } from "./commands";

const token = process.env.TWITCH_OAUTH_TOKEN;
const channel = process.env.CHANNEL;

if (!token) {
  console.error("TWITCH_OAUTH_TOKEN not found in .env! Exiting");
  process.kill(process.pid);
}

if (!channel) {
  console.error("CHANNEL not found in .env! Exiting");
  process.kill(process.pid);
}

const client = new tmi.Client({
  token: token,
  channels: [`${channel}`],
});

client.connect();

client.on("message", (e) => {
  const { channel, user, message } = e;
  if (user.isBot || !message || !message.text || !message.text.startsWith("!"))
    return;
  const userInput = message.text.trim().replace(/^!+/, "").trim().toLowerCase();
  const userCommand = commands.find((cmd) =>
    cmd.trigger.some((trigger) => userInput.includes(trigger.toLowerCase())),
  );

  if (userCommand) {
    client
      .say(channel, `@${user.login} ${userCommand.response}`)
      .then(() => {
        console.log(`${userCommand.name} command succeeded.`);
      })
      .catch((err) => {
        console.log(`${userCommand.name} command failed. ${err}`);
      });
  }
});
