import { create } from "domain";
export class ChatController {
    chatService;
    constructor(chatService) {
        this.chatService = chatService;
    }
    // localhost:9999/api/chat/messages?limit=50&before=<time>
    listMessages = async (req, res) => {
        const messages = await this.chatService.listHistory(req.query);
        res.json(messages.map((m) => ({
            id: m._id.toString(),
            userEmail: m.userEmail,
            role: m.role,
            text: m.text,
            createdAt: m.createdAt,
        })));
    };
}
//# sourceMappingURL=chat.controller.js.map