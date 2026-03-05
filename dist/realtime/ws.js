// Outbound: message từ server -> client
function safeJsonParse(data) {
    const s = typeof data === "string"
        ? data
        : Buffer.isBuffer(data)
            ? data.toString("utf8")
            : null;
    return s ? JSON.parse(s) : null;
}
export {};
//# sourceMappingURL=ws.js.map