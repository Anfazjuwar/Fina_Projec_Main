const Chat = require("../models/Chat");

module.exports = function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("New socket connected");

    socket.on("join", (userId) => {
      socket.join(userId); // Each user/admin joins their room
    });

    socket.on("sendMessage", async (data) => {
      try {
        const newMsg = new Chat(data);
        await newMsg.save();

        // Emit to sender and receiver rooms
        io.to(data.sender._id).emit("receiveMessage", newMsg);
        io.to(data.receiver._id).emit("receiveMessage", newMsg);
      } catch (err) {
        console.error("Error saving chat message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
