import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000"]
    }
});

let count = 0;
let socketRoom = '';
let players:any = {};

io.on("connection", (socket) => {
    console.log('user: ',socket.id);


    socket.on('joinRoom', async (room: string, socketId: string, name: string) => {
        const connectedSockets = io.sockets.adapter.rooms.get(room);
        if(connectedSockets && connectedSockets?.size === 2){
            io.to(socketId).emit('roomJoinError',{
                error: "Room is full please choose another room to play!"
            });
        }else{
            await socket.join(room);
            socketRoom = room;
            count = 0;
            if(!(socketId in players)){
                players[socketId] = name;
            }
            io.in(room).emit('roomJoined',room);
        }

    });

    socket.on('leaveRoom', async (room: string, socketId: string) => {
        await socket.leave(room);
        delete players[socketId];
        const connectedSockets = io.sockets.adapter.rooms.get(room);
        if(!connectedSockets || connectedSockets?.size < 2){
            io.to(socketId).emit('leaveBingoPage');
            socket.to(room).emit('roomLeft',socketId, room);
        }

    });

    socket.on('playerReady', (room: string, socketId: string) => {
        // socket.to(room).emit('playerReady',socketId); 
        io.in(room).emit('playerReady',socketId);
        count = count + 1;
        if(count === 2){
            const connectedSockets = io.sockets.adapter.rooms.get(room);
            let arr:Array<string> = [];
            connectedSockets?.forEach( key => arr.push(key) );
            count = 0;
            io.in(room).emit('startGame',Math.random() < 0.5 ?  arr[0] : arr[1]);
        }
    });

    socket.on('isRoomFull',(room: string) => {
        const connectedSockets = io.sockets.adapter.rooms.get(room);
        const array: string[] = [];
        connectedSockets?.forEach(v => array.push(v));

        const roomPlayers:any = {};
        roomPlayers[array[0]] = players[array[0]];
        roomPlayers[array[1]] = players[array[1]];

        io.in(room).emit('roomSize',roomPlayers);

    });

    socket.on('cellClicked',(cellValue: number,  room: string) => {
        socket.to(room).emit('cellColorChange',cellValue);
    });

    socket.on('playerWon',(socketId: string,room: string) => {
        io.in(room).emit('playerWon',socketId);
    })

});

httpServer.listen(5050, () => console.log('HttpServer is listening on port 5050'));
