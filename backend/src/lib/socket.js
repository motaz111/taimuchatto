import { getReceiverSocketId, userSocketMap } from "../store/socketStore.js";

export const configureSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined") {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("sendMessage", (message) => {
      console.log("sendMessage event received:", message); // LOG 1: Pesan diterima
      const receiverSocketId = getReceiverSocketId(message.receiverId);
      console.log("Receiver socket ID:", receiverSocketId); // LOG 2: ID Soket Penerima

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", message);
        console.log("Emitted newMessage to:", receiverSocketId); // LOG 3: Event dikirim
      } else {
        console.log("Receiver not found or offline"); // LOG 4: Penerima tidak ditemukan
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
      // Hapus pengguna dari peta saat terputus
      const disconnectedUserId = Object.keys(userSocketMap).find(
        (key) => userSocketMap[key] === socket.id
      );
      if (disconnectedUserId) {
        delete userSocketMap[disconnectedUserId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      }
    });
  });
};
