import type { ChatDatabase } from "./chat.database.js";
export default class ChatService {
    private readonly chatDb;
    constructor(chatDb: ChatDatabase);
    postMessage(): Promise<void>;
    listHistory(): Promise<void>;
    parsePositiveInt(v: string | undefined, fallback: number, max: number): Promise<number>;
}
//# sourceMappingURL=chat.service.d.ts.map