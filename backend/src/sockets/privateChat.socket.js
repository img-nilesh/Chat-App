const Message = require("../models/Message.js");

module.exports = (io, socket) => {

    socket.on("join_private_room", (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined ${roomId}`);
    });


    socket.on("send_private_message", async (data) => {
        try {

            const { sender, receiver, message, roomId } = data;

            const newMessage = await Message.create({
                sender,
                receiver,
                message,
                type: "private"
            });

            io.to(roomId).emit("receive_private_message", newMessage);

        } catch (error) {
            console.log(error);
        }
    });

};