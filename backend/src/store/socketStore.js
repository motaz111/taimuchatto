// Peta untuk menyimpan ID soket pengguna { userId: socketId }
export const userSocketMap = {};

// Reference to the global io instance
let globalIoInstance = null;

/**
 * Mendapatkan ID soket dari pengguna penerima.
 * @param {string} userId - ID pengguna penerima.
 * @returns {string|undefined} ID soket jika pengguna online, jika tidak undefined.
 */
export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

/**
 * Sets the global io instance
 * @param {Object} io - Socket.IO server instance
 */
export const setGlobalIo = (io) => {
  globalIoInstance = io;
};

/**
 * Gets the global io instance
 * @returns {Object} Socket.IO server instance
 */
export const getGlobalIo = () => {
  return globalIoInstance;
};

/**
 * Emits a message to a specific user
 * @param {string} userId - ID of the recipient user
 * @param {string} event - Event name to emit
 * @param {any} data - Data to send
 */
export const emitToUser = (userId, event, data) => {
  if (!globalIoInstance) {
    console.error('Socket.IO instance not set');
    return false;
  }

  const socketId = userSocketMap[userId];
  if (socketId) {
    globalIoInstance.to(socketId).emit(event, data);
    return true;
  }
  return false;
};
