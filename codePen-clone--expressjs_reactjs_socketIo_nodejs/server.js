import express from "express";
import cors from "cors";
import http from "http";
import { Server as SocketServer } from "socket.io";
const app = express();
const server = http.createServer(app);
const IO = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

let editorState = {
  html: "",
  css: "",
  js: "",
};

app.get("/sync", (req, res) => {
  res.json({ data: editorState });
});

IO.on("connection", (socket) => {
  socket.on("onChange", (val) => {
    editorState = val;
    socket.broadcast.emit("onSyncUp", editorState);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server Listning On Port: ${PORT}`));
