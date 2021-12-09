const rooms = []
const createRoom = (roomId, mode, playerSocketId, host, score, started) => {
    rooms[roomId] = []
    //                  roomId|mode|playerId|socketId|hostname|score|started
    rooms[roomId].push([roomId, mode, rooms[roomId].length+1, playerSocketId, host, score, started])
    console.log(rooms[roomId])
}

const joinRoom = (roomId, mode, playerSocketId, player, score, started) => {
    //                  roomId|mode|playerId|socketId|hostname|score|started
    rooms[roomId].push([roomId, mode, rooms[roomId].length+1, playerSocketId, player, score, started])
    console.log(rooms[roomId])
}

const leaveRoom = (roomId, playerId) => {
    rooms[roomId].splice(playerId-1, 1)
    console.log('Player',playerId,'exited')
}

const exitRoom = roomId => {
    delete rooms[roomId]
    console.log('Host exited')
}

module.exports = {rooms, createRoom, joinRoom, leaveRoom, exitRoom}