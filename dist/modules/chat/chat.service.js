import { ApiError } from "../../utils/http.js";
export default class ChatService {
    chatDb;
    constructor(chatDb) {
        this.chatDb = chatDb;
    }
    async postMessage() { }
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