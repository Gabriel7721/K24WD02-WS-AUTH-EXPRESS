export default class ChatService {
    chatDb;
    constructor(chatDb) {
        this.chatDb = chatDb;
    }
    async postMessage() { }
    async listHistory() { }
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