import { socket, SOCKET_EVENT } from "context/socket";

const SocketService = {
  connect() {
    socket.connect();
  },

  disconnect() {
    socket.disconnect();
  },

  registerHandler(event, callback) {
    socket.on(event, callback);
  },

  unregisterHandler(event, callback = undefined) {
    socket.off(event, callback);
  },

  joinChannel(channelId, userId) {
    socket.emit(SOCKET_EVENT.JOIN_ROOM, {
      groupId: channelId,
      userId
    });
  },

  leaveChannel(channelId, userId) {
    socket.emit(SOCKET_EVENT.OUT_ROOM, {
      groupId: channelId,
      userId
    });
  },

  sendMessage(message) {
    socket.emit(SOCKET_EVENT.SEND_MESSAGE, message);
  }
};

export default SocketService;
