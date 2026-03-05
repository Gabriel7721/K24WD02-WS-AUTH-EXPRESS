import { WebSocket, WebSocketServer } from "ws";
import { UserDatabase } from "../modules/user/user.database.js";
import ChatService from "../modules/chat/chat.service.js";
import { ChatDatabase } from "../modules/chat/chat.database.js";
// Outbound: message từ server -> client
function safeJsonParse(data) {
    const s = typeof data === "string"
        ? data
        : Buffer.isBuffer(data)
            ? data.toString("utf8")
            : null;
    return s ? JSON.parse(s) : null;
}
export function attachWsServer(server) {
    const wss = new WebSocketServer({ server, path: "/ws" });
    const userDb = new UserDatabase();
    const chatService = new ChatService(new ChatDatabase());
    const broadCast = (obj) => {
        const payload = JSON.stringify(obj);
        for (const c of wss.clients) {
            if (c.readyState === WebSocket.OPEN)
                c.send(payload);
        }
    };
}
//# sourceMappingURL=ws.js.map