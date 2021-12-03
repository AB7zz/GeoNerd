const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const { emit } = require('process')
const server = http.createServer(app)
const socketio = require('socket.io')
const {rooms, createRoom, joinRoom, leaveRoom, exitRoom} = require('./util/db.js')
const {userConnected} = require('./util/users.js')
app.use(express.static(path.join(__dirname, 'public')))
const io = socketio(server)
let Cmode = 0
let score = 0
let rId = ''
let pId = ''
io.on('connection', socket => {
    console.log(rooms)
    socket.on('create-room', ({host, mode, roomId}) => {
        Cmode = mode
        rId = roomId
        if(rooms[roomId]){
            const message = "A room already exists with id "+ roomId
            socket.emit('display-error', message)
        }else{
            socket.join(roomId)
            userConnected(socket.client.id)
            createRoom(roomId, mode, socket.client.id, host, score)
            socket.emit('host-connected', host, roomId)
            socket.emit('room-created', roomId)
            console.log('Host Connected')
        }
    })

    socket.on('join-room', ({player, roomId}) => {
        rId = roomId
        if(!rooms[roomId]){
            const message = "No such room exists"
            socket.emit('display-error', message)
        }else{
            socket.join(roomId)
            userConnected(socket.client.id)
            joinRoom(roomId, Cmode, socket.client.id, player, score)
            io.to(roomId).emit('player-connected', rooms[roomId], roomId)
            let index = rooms[roomId].length-1
            pId = rooms[roomId][index][2]
            socket.emit('room-joined', roomId, rooms[roomId][index][2])
            console.log('Player Joined')
        }
    })

    socket.on('start-game', roomId => {
        io.to(roomId).emit('game-display', rooms[roomId])
    })

    socket.on('display-street', ({roomId, locIndex}) => {
        io.to(roomId).emit('street-display', locIndex, Cmode)
    })

    socket.on('score-inc', ({playerId, roomId, distance}) => {
        if(Math.round(distance) < 20){
            rooms[roomId][playerId-1][5] += 500;
        }else if(Math.round(distance) > 20 && Math.round(distance) < 100){
            rooms[roomId][playerId-1][5] += 400;
        }else if(Math.round(distance) > 100 && Math.round(distance) < 500){
            rooms[roomId][playerId-1][5] += 350;
        }else if(Math.round(distance) > 500 && Math.round(distance) < 1000){
            rooms[roomId][playerId-1][5] += 300;
        }else if(Math.round(distance) > 1000 && Math.round(distance) < 1500){
            rooms[roomId][playerId-1][5] += 250;
        }else if(Math.round(distance) > 1500 && Math.round(distance) < 2500){
            rooms[roomId][playerId-1][5] += 200;
        }else if(Math.round(distance) > 2500 && Math.round(distance) < 5000){
            rooms[roomId][playerId-1][5] += 150;
        }else if(Math.round(distance) > 5000 && Math.round(distance) < 7000){
            rooms[roomId][playerId-1][5] += 100;
        }else if(Math.round(distance) > 7000 && Math.round(distance) < 10000){
            rooms[roomId][playerId-1][5] += 50;
        }else if(Math.round(distance) > 1000){
            rooms[roomId][playerId-1][5] += 0;
        }
        console.log(rooms[roomId])
        io.to(roomId).emit('score-upd', rooms[roomId])
    })

    socket.on('round-over', () => {
        io.to(roomId).emit('winner-disp', rooms[rId])
    })

    socket.on('disconnect', () => {
        if(rooms[rId]){
            if(rooms[rId][0][3]==socket.client.id){
                exitRoom(rId)
            }else{
                leaveRoom(rId, pId)
                io.to(rId).emit('player-left', rooms[rId])
            }
        }
    })


})
io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});
 
const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log('Server running in http://localhost:3000/'))  