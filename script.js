let ws;

function connect() {
  const t = token.value.trim();
  ws = new WebSocket(`ws://localhost:9999/ws?token=${encodeURIComponent(t)}`);

  ws.onmessage = (event) => {
    const m = JSON.parse(event.data);

    if (m.type === "message") {
      box.innerHTML += `<div>${m.data.userEmail}: ${m.data.text}</div>`;
    }
  };
}

function send() {
  ws.send(JSON.stringify({ type: "message", text: text.value }));
  text.value = "";
}
