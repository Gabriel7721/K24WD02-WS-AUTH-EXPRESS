import type { ChatDatabase } from "./chat.database.js";
export default class ChatService {
    private readonly chatDb;
    constructor(chatDb: ChatDatabase);
    postMessage(input: {
        userId: string;
        userEmail: string;
        role: "customer" | "admin";
        text: string;
    }): Promise<import("./chat.model.js").ChatMessageEntity>;
    listHistory(input: {
        limit?: string;
        before?: string;
    }): Promise<import("./chat.model.js").ChatMessageEntity[]>;
    parsePositiveInt(v: string | undefined, fallback: number, max: number): Promise<number>;
}
//# sourceMappingURL=chat.service.d.ts.map