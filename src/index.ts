import { ApiClient } from "@twurple/api";
import { RefreshingAuthProvider } from "@twurple/auth";
import { ChatClient } from "@twurple/chat";

import { botSay, initBotSay } from "./botSay.ts";
import { findCommand } from "./commands.ts";
import console from "node:console";

const tokenData = JSON.parse(await Deno.readTextFile("./tokens.json"));

const clientId = process.env.TWITCH_CLIENT_ID!;
const clientSecret = process.env.TWITCH_CLIENT_SECRET!;
const channel = process.env.CHANNEL;
const botUserId = process.env.TWITCH_BOT_ID;

if (!clientId) {
  console.error("TWITCH_CLIENT_ID not found in .env! Exiting");
  process.kill(process.pid);
}

if (!clientSecret) {
  console.error("TWITCH_CLIENT_SECRET not found in .env! Exiting");
  process.kill(process.pid);
}

if (!channel) {
  console.error("CHANNEL not found in .env! Exiting");
  process.kill(process.pid);
}

if (!botUserId) {
  console.error("TWITCH_BOT_ID not found in .env! Exiting");
  process.kill(process.pid);
}

const authProvider = new RefreshingAuthProvider({
  clientId,
  clientSecret,
});

authProvider.onRefresh(
  async (_userId, newTokenData) =>
    await Deno.writeTextFile(
      `./tokens.json`,
      JSON.stringify(newTokenData, null, 4),
    ),
);

await authProvider.addUserForToken(tokenData, [
  "chat",
  "user:write:chat",
  "user:bot",
]);

const apiClient = new ApiClient({ authProvider: authProvider });

initBotSay(apiClient, botUserId!);

const chatClient = new ChatClient({
  authProvider,
  channels: [`${channel}`],
});

chatClient.connect();

chatClient.onAuthenticationSuccess(() => {
  console.log("Connected and authenticated");
});

chatClient.onMessage(async (_channel, user, text, msg) => {
  if (msg.userInfo.userId === botUserId) return;
  if (!text.startsWith("!")) return;
  const userInput = text.trim().replace(/^!+/, "").trim().toLowerCase();
  const userCommand = findCommand(userInput);
  if (userCommand) {
    try {
      await botSay(msg.channelId!, `@${user} ${userCommand.response}`);
      console.log(`${userCommand.name} command succeeded.`);
    } catch (err) {
      console.error(`${userCommand.name} command failed:`, err);
    }
  }
});
