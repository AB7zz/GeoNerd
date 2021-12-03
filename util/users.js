const connectedUsers = {}
const userConnected = playerSocketId => {
    connectedUsers[playerSocketId] = true
}
module.exports = {connectedUsers, userConnected}
