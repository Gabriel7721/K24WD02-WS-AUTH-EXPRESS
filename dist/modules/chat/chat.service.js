import { ObjectId } from "mongodb";
import { ApiError } from "../../utils/http.js";
export default class ChatService {
    chatDb;
    constructor(chatDb) {
        this.chatDb = chatDb;
    }
    async postMessage(input) {
        const text = (input.text ?? "").trim();
        if (!text) {
            throw new ApiError(400, { message: "Message text is required" });
        }
        if (text.length > 2000) {
            throw new ApiError(400, {
                message: "Message text is too long (> 200 characters)",
            });
        }
        const now = new Date();
        return this.chatDb.insert({
            userId: new ObjectId(input.userId),
            userEmail: input.userEmail,
            role: input.role,
            text,
            createdAt: now,
        });
    }
    async listHistory(input) {
        const limit = Number(this.parsePositiveInt(input.limit, 50, 200));
        let beforeDate;
        if (input.before) {
            const d = new Date(input.before);
            if (Number.isNaN(d.getTime())) {
                throw new ApiError(400, { message: "Invalid before ISO date" });
            }
            beforeDate = d;
        }
        return this.chatDb.list({ before: beforeDate, limit });
    }
    // => limit(500,50,200) => limit(200)
    // => limit("one",50,200) => limit(50)
    async parsePositiveInt(v, fallback, max) {
        if (!v)
            return fallback;
        const n = Number(v);
        if (!Number.isInteger(n) || n <= 0)
            return fallback;
        return Math.min(n, max);
    }
}
//# sourceMappingURL=chat.service.js.map