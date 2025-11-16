// Peta untuk menyimpan ID soket pengguna { userId: socketId }
export const userSocketMap = {};

/**
 * Mendapatkan ID soket dari pengguna penerima.
 * @param {string} userId - ID pengguna penerima.
 * @returns {string|undefined} ID soket jika pengguna online, jika tidak undefined.
 */
export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};
