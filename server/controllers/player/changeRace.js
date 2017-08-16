const eventEmitter = require('../communication/eventEmitter');
const messagesType = require('../communication/messagesType');
const racesName = require('./racesName');

module.exports = (gameTable, playerIndex, newRace) => {
    gameTable.players[playerIndex].race = newRace;
    let message = {
        type: messagesType.INFO,
        text: gameTable.players[playerIndex].name + ' changed his race to ' + racesName[gameTable.players[playerIndex].race]
    };
    eventEmitter.sendChatMessage(gameTable.id, message);
    gameTable.chatHistory.unshift(message);
};