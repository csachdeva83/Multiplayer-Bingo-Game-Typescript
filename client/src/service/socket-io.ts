import { io } from "socket.io-client";

// export const socket = io("http://localhost:5050", { transports: ['websocket', 'polling', 'flashsocket'] });
export const socket = io("https://multiplayer-bingo-game.herokuapp.com", { transports: ['websocket', 'polling', 'flashsocket'] });



socket.on("connect", () => {
    console.log('Is socket connected?', socket.connected); // true
    console.log('user: ',socket.id);
});
