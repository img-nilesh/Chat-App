const Message = require("../models/Message.js");

module.exports = (io, socket) => {

    socket.on("join_group", (groupId) => {
        socket.join(groupId);
        console.log(`Socket ${socket.id} joined group ${groupId}`);
    });

    socket.on("new_group", (group) => {
        socket.broadcast.emit("group_created", group);
    });

    socket.on("send_group_message", async (data) => {
        try {

            const { sender, groupId, message } = data;

            const newMessage = await Message.create({
                sender,
                group: groupId,
                message,
                type: "group"
            });

            io.to(groupId).emit("receive_group_message", newMessage);

        } catch (error) {
            console.log(error);
        }
    });

};