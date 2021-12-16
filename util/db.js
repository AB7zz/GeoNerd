const rooms = []
const createRoom = (roomId, mode, playerSocketId, host, rounds, playerLim, timeLim, score, started, roundsPlayed) => {
    rooms[roomId] = []
    //                    0      1      2        3       4       5        6        7      8      9        10
    //                  roomId|mode|playerId|socketId|hostname|rounds|playerLim|timeLim|score|started|roundsPlayed

    
    rooms[roomId].push([roomId, mode, rooms[roomId].length+1, playerSocketId, host, rounds, playerLim, timeLim, score, started, roundsPlayed])
    // console.log(rooms[roomId])
}

const joinRoom = (roomId, mode, playerSocketId, player, rounds, playerLim, timeLim, score, started) => {
    let roundsPlayed = rooms[roomId][0][10];
    rooms[roomId].push([roomId, mode, rooms[roomId].length+1, playerSocketId, player, rounds, playerLim, timeLim, score, started, roundsPlayed])
    // console.log(rooms[roomId])
}

const leaveRoom = (roomId, leftIndex) => {
    rooms[roomId].splice(leftIndex, 1)
    console.log('Player',leftIndex+1,'exited')
    for(let i=0;i<rooms[roomId].length; i++){
        rooms[roomId][i][2] -= 1;
    }
    console.log(rooms[roomId]);
}

const exitRoom = roomId => {
    delete rooms[roomId]
    console.log('Host exited')
}

module.exports = {rooms, createRoom, joinRoom, leaveRoom, exitRoom}