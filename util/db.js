const rooms = []
const createRoom = (roomId, mode, playerSocketId, host, rounds, playerLim, timeLim, score, started, roundsPlayed) => {
    rooms[roomId] = []
    //                    0      1      2        3       4       5        6        7      8      9        10          11
    //                  roomId|mode|playerId|socketId|hostname|rounds|playerLim|timeLim|score|started|roundsPlayed|heClicked

    
    rooms[roomId].push([roomId, mode, rooms[roomId].length+1, playerSocketId, host, rounds, playerLim, timeLim, score, started, roundsPlayed,false])
    // console.log(rooms[roomId])
}

const joinRoom = (roomId, mode, playerSocketId, player, rounds, playerLim, timeLim, score, started) => {
    let roundsPlayed = rooms[roomId][0][10];
    rooms[roomId].push([roomId, mode, rooms[roomId].length+1, playerSocketId, player, rounds, playerLim, timeLim, score, started, roundsPlayed,false])
    // console.log(rooms[roomId])
}

const leaveRoom = (roomId, leftIndex) => {
    if(rooms[roomId]){
        if(leftIndex!=0 || leftIndex!='0'){
            rooms[roomId].splice(leftIndex, 1)
            console.log('Player',leftIndex+1,'exited')
            for(let i=1;i<rooms[roomId].length; i++){
                if(rooms[roomId][i][2]-1!=rooms[roomId][i-1][2]){
                    rooms[roomId][i][2] -= 1;
                }
            }
            console.log(rooms[roomId]);
        }else{
            console.log('Escaped an error!')
            exitRoom(roomId);
        }
    }
}

const exitRoom = roomId => {
    delete rooms[roomId]
    console.log('Host exited')
}

module.exports = {rooms, createRoom, joinRoom, leaveRoom, exitRoom}