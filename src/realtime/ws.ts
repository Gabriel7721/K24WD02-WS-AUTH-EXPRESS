import type { WebSocket } from "ws";

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
