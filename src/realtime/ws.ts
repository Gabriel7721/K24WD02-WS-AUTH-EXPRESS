import { WebSocket, WebSocketServer } from "ws";
import type http from "node:http";
import { UserDatabase } from "../modules/user/user.database.js";
import ChatService from "../modules/chat/chat.service.js";
import { ChatDatabase } from "../modules/chat/chat.database.js";

type WsClient = WebSocket & {
  user?: { userId: string; email: string; role: "customer" | "admin" };
};

type Inbound = { type: "message"; text: string }; // tin nhắn gửi từ client -> server
// Outbound: message từ server -> client

function safeJsonParse(data: unknown): any | null {
  const s =
    typeof data === "string"
      ? data
      : Buffer.isBuffer(data)
        ? data.toString("utf8")
        : null;
  return s ? JSON.parse(s) : null;
}

export function attachWsServer(server: http.Server) {
  const wss = new WebSocketServer({ server, path: "/ws" });

  const userDb = new UserDatabase();
  const chatService = new ChatService(new ChatDatabase());

  const broadCast = (obj: unknown) => {
    const payload = JSON.stringify(obj);
    for (const c of wss.clients) {
      if (c.readyState === WebSocket.OPEN) c.send(payload);
    }
  };
}
