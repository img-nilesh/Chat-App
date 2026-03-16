module.exports = (io, socket) => {

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });

};