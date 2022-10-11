import { io } from "socket.io-client";

export const socket = io("http://localhost:5050");

socket.on("connect", () => {
    console.log('Is socket connected?', socket.connected); // true
    console.log('user: ',socket.id);
});
