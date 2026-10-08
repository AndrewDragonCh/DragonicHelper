import type { ApiClient } from "@twurple/api";

let apiClient: ApiClient;
let botUserId: string;

export function initBotSay(client: ApiClient, botId: string) {
  apiClient = client;
  botUserId = botId;
}

export async function botSay(
  broadcasterId: string,
  message: string,
  replyToMessageId?: string,
) {
  try {
    await apiClient.chat.sendChatMessageAsApp(
      botUserId,
      broadcasterId,
      message,
      {
        replyParentMessageId: replyToMessageId,
      },
    );
  } catch (err) {
    console.error("Failed to send chat message:", err);
  }
}
