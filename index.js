const express = require("express");
const http = require("http");
const path = require("path");

const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.username = "Unknown User";

  socket.on("user-joined", (name) => {
    console.log(`User ${socket.id} joined as: ${name}`);
    socket.username = name;
    socket.broadcast.emit("user-connected", name);
  });

  socket.on("typing", (name) => {
    socket.broadcast.emit("user-typing", name);
  });

  socket.on("join-room", (data) => {
    socket.join(data.room);
    socket.username = data.name;
    socket.broadcast.to(data.room).emit("user-connected", `${data.name} joined ${data.room}`);
  });

  socket.on("user-message", (message) => {
    console.log(`Message from ${socket.username}:`, message);
    io.emit("message", message);
  });

  socket.on("disconnect", (reason) => {
    console.log(`User disconnected: ${socket.id} (${socket.username}), reason: ${reason}`);
    socket.broadcast.emit("user-disconnected", socket.username);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});