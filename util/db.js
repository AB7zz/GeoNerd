const rooms = []
const createRoom = (roomId, mode, playerSocketId, host, score) => {
    rooms[roomId] = []
    rooms[roomId].push([roomId, mode, rooms[roomId].length+1, playerSocketId, host, score])
    console.log(rooms[roomId])
}

const joinRoom = (roomId, mode, playerSocketId, player, score) => {
    rooms[roomId].push([roomId, mode, rooms[roomId].length+1, playerSocketId, player, score])
    console.log(rooms[roomId])
}

const leaveRoom = (roomId, playerId) => {
    delete rooms[roomId][playerId-1]
    console.log('Player',playerId,'exited')
}

const exitRoom = roomId => {
    delete rooms[roomId]
    console.log('Host exited')
}

module.exports = {rooms, createRoom, joinRoom, leaveRoom, exitRoom}