const eventEmitter = require('../communication/eventEmitter');
const rolesName = require('./rolesName');

module.exports = (gameTable, playerIndex, itemIndex) => {
    gameTable.players[playerIndex].role = gameTable.players[playerIndex].hand[itemIndex].roleType;
    eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' changed his role to ' + rolesName[gameTable.players[playerIndex].role]);
};
