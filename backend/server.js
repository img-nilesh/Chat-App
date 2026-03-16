const http = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { initSocket } = require("./src/config/socket.js");

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

mongoose
  .connect("mongodb://localhost:27017/chat-app")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const server = http.createServer(app);

initSocket(server);

const authRoutes = require("./src/routes/auth.routes.js");
const userRoutes = require("./src/routes/user.routes.js");
const messageRoutes = require("./src/routes/message.routes.js");
const groupRoutes = require("./src/routes/group.routes.js");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/groups", groupRoutes);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});