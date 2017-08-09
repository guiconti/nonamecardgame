const eventEmitter = require('../communication/eventEmitter');
const sexName = require('./sexName');

module.exports = (gameTable, playerIndex, newSex) => {
    gameTable.players[playerIndex].sex = newSex;
    eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' changed his sex to ' + sexName[gameTable.players[playerIndex].sex]);
};