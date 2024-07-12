/* eslint-disable import/prefer-default-export */
import io from "socket.io-client";

import { SOCKET_URL } from "config";

const URL = SOCKET_URL;

const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
  jsonp: false,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000
});

socket.on("connect", () => {
  console.log("@SOCKET: Connected");
  socket.on("disconnect", (reason) => {
    console.log("@SOCKET: Disconnected", reason);
  });
});

socket.on("connect_error", (err) => {
  console.log("@SOCKET: Error", err);
});

export { socket };

export const SOCKET_EVENT = {
  JOIN_ROOM: "join_room",
  OUT_ROOM: "out_room",

  SEND_MESSAGE: "send_message",
  RECEIVE_MESSAGE: "receive_message",
  UPDATE_MESSAGE: "update_message",

  RECEIVE_REACT_MESSAGE: "receive_react_message",
  REMOVE_REACT_MESSAGE: "receive_remove_react_message",

  RECEIVE_PINNED_MESSAGE: "receive_pinned_message",
  REMOVE_PINNED_MESSAGE: "receive_unpinned_message",

  RECEIVE_VOTING: "receive_voting"
};
