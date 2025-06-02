const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Optional: Serve static frontend files (like index.html)
app.use(express.static("public"));

wss.on("connection", (ws) => {
  console.log("🟢 WebSocket client connected");

  // Echo back the incoming message (test setup)
  ws.on("message", (msg) => {
    try {
      const messageString = msg.toString();
      const data = JSON.parse(messageString);
      console.log("📨 Parsed message:", data);

      // 👇 Echo it to ALL clients, including listeners like yours
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    } catch (e) {
      console.error("❌ Failed to parse message:", e);
    }
  });

  ws.on("close", () => {
    console.log("👋 WebSocket client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
