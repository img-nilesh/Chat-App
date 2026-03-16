const { Server } = require("socket.io");
const registerSocketHandlers = require("../sockets");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  registerSocketHandlers(io);
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = {
  initSocket,
  getIO
};