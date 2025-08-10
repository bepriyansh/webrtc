import express from 'express'
import { Server } from 'socket.io'
import bodyParser from 'body-parser';
import { config, socketEvents } from './src/config.js';

const io = new Server;
const app = express();
app.use(bodyParser.json());

const emailToSocketMapping = new Map();
const socketToEmailtMapping = new Map();

io.on(socketEvents.connection, (socket)=>{
    socket.on(socketEvents.joinRoom, data => {
        const {emailId, roomId} = data;
        console.log(`User ${emailId} joined room ${roomId}`);
        emailToSocketMapping.set(emailId, socket.id);
        socketToEmailtMapping.set(socket.id, emailId);
        socket.join(roomId);
        socket.broadcast.to(roomId).emit(socketEvents.userJoined, {emailId});
    })
})

app.listen(config.EXPRESSPORT, ()=>console.log(`Server running on port : ${config.EXPRESSPORT}`));
io.listen(config.SOCKETPORT);