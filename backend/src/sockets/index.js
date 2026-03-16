const privateChatSocket = require("./privateChat.socket.js");
const groupChatSocket = require("./groupChat.socket.js");
const connectionSocket = require("./connection.socket.js");

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        privateChatSocket(io, socket);
        groupChatSocket(io, socket);
        connectionSocket(io, socket);
    });
};