const rooms = []
const createRoom = (roomId, mode, playerSocketId, host, rounds, playerLim, timeLim, score, started) => {
    rooms[roomId] = []
    //                    0      1      2        3       4       5        6        7      8      9
    //                  roomId|mode|playerId|socketId|hostname|rounds|playerLim|timeLim|score|started

    
    rooms[roomId].push([roomId, mode, rooms[roomId].length+1, playerSocketId, host, rounds, playerLim, timeLim, score, started])
    console.log(rooms[roomId])
}

const joinRoom = (roomId, mode, playerSocketId, player, rounds, playerLim, timeLim, score, started) => {
    rooms[roomId].push([roomId, mode, rooms[roomId].length+1, playerSocketId, player, rounds, playerLim, timeLim, score, started])
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