import type { ChatDatabase } from "./chat.database.js";

export default class ChatService {
  constructor(private readonly chatDb: ChatDatabase) {}

  async postMessage() {}
  async listHistory() {}
  // => limit(500,50,200) => limit(200)
  // => limit("one",50,200) => limit(50)
  async parsePositiveInt(v: string | undefined, fallback: number, max: number) {
    if (!v) return fallback;
    const n = Number(v);
    if (!Number.isInteger(n) || n <= 0) return fallback;
    return Math.min(n, max);
  }
}
