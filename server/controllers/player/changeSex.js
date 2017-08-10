const eventEmitter = require('../communication/eventEmitter');
const messagesType = require('../communication/messagesType');
const sexName = require('./sexName');

module.exports = (gameTable, playerIndex, newSex) => {
    gameTable.players[playerIndex].sex = newSex;
    let message = {
        type: messagesType.INFO,
        text: gameTable.players[playerIndex].name + ' changed his sex to ' + sexName[gameTable.players[playerIndex].sex]
    };
    eventEmitter.sendChatMessage(gameTable.id, message);
};