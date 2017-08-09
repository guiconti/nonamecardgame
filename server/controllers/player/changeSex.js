const eventEmitter = require('../communication/eventEmitter');
const sexName = require('./sexName');

module.exports = (gameTable, playerIndex, itemIndex) => {
    gameTable.players[playerIndex].sex = gameTable.players[playerIndex].hand[itemIndex].sexType;
    eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' changed his sex to ' + sexName[gameTable.players[playerIndex].sex]);
};