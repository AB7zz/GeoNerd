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
let confirmCnt = 0;
let started = 0;
io.on('connection', socket => {
    socket.on('create-room', ({host, mode, roomId, rounds, timeLim, playerLim}) => {
        Cmode = mode
        rId = roomId
        if(host==""){
            const message = "Please enter a name"
            socket.emit('display-error', message)
        }else if(roomId==""){
            const message = "Please enter a room name"
            socket.emit('display-error', message)
        }else if(mode==""){
            const message = "Please choose a mode"
            socket.emit('display-error', message)
        }else if(rounds==""){
            const message = "Please enter the max number of rounds"
            socket.emit('display-error', message)
        }else if(timeLim==""){
            const message = "Please enter the time limit for each round"
            socket.emit('display-error', message)
        }else if(playerLim==""){
            const message = "Please enter the max number of room members"
            socket.emit('display-error', message)
        }else if(rounds>50){
            const message = "Maximum rounds cannot exceed 50"
            socket.emit('display-error', message)
        }else if(playerLim>100){
            const message = "Maximum number of room members cannot exceed 100"
            socket.emit('display-error', message)
        }else if(timeLim>600){
            const message = "Time limit cannot exceed 600 seconds"
            socket.emit('display-error', message)
        }else if(rooms[roomId] && (socket.client.id == rooms[roomId][0][3])){
            socket.emit('host-connected', host, roomId)
            socket.emit('room-created', roomId)
        }else if(rooms[roomId]){
            const message = "A room already exists with id "+ roomId
            socket.emit('display-error', message)
        }else{
            socket.join(roomId)
            userConnected(socket.client.id)
            started = 0;
            createRoom(roomId, mode, socket.client.id, host, rounds, playerLim, timeLim, score, started)
            socket.emit('host-connected', host, roomId)
            socket.emit('room-created', roomId)
            console.log('Host Connected')
            console.log(rooms[roomId]);
        }
    })

    socket.on('join-room', ({player, roomId}) => {
        rId = roomId
        if(player==""){
            const message = "Please enter a name"
            socket.emit('display-error', message)
        }else if(roomId==""){
            const message = "Please enter a room name"
            socket.emit('display-error', message)
        }else if(!rooms[roomId]){
            const message = "No such room exists"   
            socket.emit('display-error', message)
        }else if(rooms[roomId][0][9] == 1){
            const message = "They have already started the game"   
            socket.emit('display-error', message)
        }else if(rooms[roomId].length == rooms[roomId][0][6]){
            const message = "Room is full"   
            socket.emit('display-error', message)
        }else if(socket.client.id == rooms[roomId][0][3]){
            const message = "You cannot join a room you created"   
            socket.emit('display-error', message)
        }else{
            socket.join(roomId)
            userConnected(socket.client.id)
            joinRoom(roomId, Cmode, socket.client.id, player, rooms[roomId][0][5], rooms[roomId][0][6], rooms[roomId][0][7], score, started)
            io.to(roomId).emit('player-connected', rooms[roomId], roomId)
            let index = rooms[roomId].length-1
            pId = rooms[roomId][index][2]
            socket.emit('room-joined', roomId, rooms[roomId], rooms[roomId][index][2])
            console.log('Player Joined')
            console.log(rooms[roomId]);
        }
    })

    socket.on('start-game', roomId => {
        io.to(roomId).emit('game-display', rooms[roomId])
    })
    let call = 0;
    socket.on('display-street', ({roomId, locIndex}) => {
        call++;
        started = 1;
        for(let i=0;i<rooms[roomId].length; i++){
            rooms[roomId][i][9] = 1;
        }
        io.to(roomId).emit('street-display', locIndex, Cmode)
    })

    socket.on('score-inc', ({playerId, roomId, distance}) => {
        if(Math.round(distance) < 20){
            rooms[roomId][playerId-1][8] += 500;
        }else if(Math.round(distance) > 20 && Math.round(distance) < 100){
            rooms[roomId][playerId-1][8] += 400;
        }else if(Math.round(distance) > 100 && Math.round(distance) < 500){
            rooms[roomId][playerId-1][8] += 350;
        }else if(Math.round(distance) > 500 && Math.round(distance) < 1000){
            rooms[roomId][playerId-1][8] += 300;
        }else if(Math.round(distance) > 1000 && Math.round(distance) < 1500){
            rooms[roomId][playerId-1][8] += 250;
        }else if(Math.round(distance) > 1500 && Math.round(distance) < 2500){
            rooms[roomId][playerId-1][8] += 200;
        }else if(Math.round(distance) > 2500 && Math.round(distance) < 5000){
            rooms[roomId][playerId-1][8] += 150;
        }else if(Math.round(distance) > 5000 && Math.round(distance) < 7000){
            rooms[roomId][playerId-1][8] += 100;
        }else if(Math.round(distance) > 7000 && Math.round(distance) < 10000){
            rooms[roomId][playerId-1][8] += 50;
        }else if(Math.round(distance) > 1000){  
            rooms[roomId][playerId-1][8] += 0;
        }
        console.log(rooms[roomId])
        io.to(roomId).emit('score-upd', rooms[roomId])
    })

    socket.on('user-confirmed', () => {
        confirmCnt++;
        if(confirmCnt == rooms[rId].length){
            io.to(rId).emit('all-users-clicked');
            confirmCnt = 0;
        }
    })

    socket.on('round-over', () => {
        io.to(rId).emit('winner-disp', rooms[rId])
        // exitRoom(rId)
    })

    socket.on('play-again', roomId => {
        console.log(rooms[roomId])
        for(let i=0;i<rooms[roomId].length; i++){
            rooms[roomId][i][9] = 0;
            rooms[roomId][i][8] = 0;
        }
        console.log(rooms[roomId])
        io.to(roomId).emit('play-again-screen', rooms[roomId])
    })

    socket.on('disconnect', () => {
        if(rooms[rId]){
            if(rooms[rId][0][3]==socket.client.id){
                io.to(rId).emit('winner-disp', rooms[rId])
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