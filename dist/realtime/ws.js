import { WebSocket, WebSocketServer } from "ws";
import { UserDatabase } from "../modules/user/user.database.js";
import ChatService from "../modules/chat/chat.service.js";
import { ChatDatabase } from "../modules/chat/chat.database.js";
import { verifyAccessToken } from "../utils/jwt.js";
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
    // Event: Connection
    wss.on("connection", async (ws, req) => {
        const url = new URL(req.url ?? "", `http://${req.headers.host}`);
        const token = url.searchParams.get("token");
        // http://localhost:9999/api/chat/messages?token=<ACCESS_TOKEN>
        if (!token)
            return ws.close(1008, "Missing Token");
        let jwt;
        jwt = verifyAccessToken(token);
        const user = await userDb.findById(jwt.sub);
        if (!user) {
            return ws.close(1008, "User not found");
        }
        ws.user = {
            userId: user?._id.toString(),
            email: user?.email,
            role: user?.role,
        };
        // Event: Message
        ws.on("message", async (raw) => {
            const msg = safeJsonParse(raw);
            if (!ws.user)
                return;
            if (!msg)
                return;
            const saved = await chatService.postMessage({
                userId: ws.user?.userId,
                userEmail: ws.user?.email,
                role: ws.user?.role,
                text: msg?.text,
            });
            broadCast({
                type: "message",
                data: {
                    id: saved._id.toString(),
                    userEmail: saved.userEmail,
                    role: saved.role,
                    text: saved.text,
                    createdAt: saved.createdAt,
                },
            });
        });
    });
}
//# sourceMappingURL=ws.js.map