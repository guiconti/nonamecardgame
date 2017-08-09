const eventEmitter = require('../communication/eventEmitter');
const rolesName = require('./rolesName');

module.exports = (gameTable, playerIndex, newRole) => {
    gameTable.players[playerIndex].role = newRole;
    eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' changed his role to ' + rolesName[gameTable.players[playerIndex].role]);
};
