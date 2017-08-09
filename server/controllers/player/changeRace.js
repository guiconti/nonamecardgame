const eventEmitter = require('../communication/eventEmitter');
const racesName = require('./racesName');

module.exports = (gameTable, playerIndex, newRace) => {
    gameTable.players[playerIndex].race = newRace;
    eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' changed his race to ' + racesName[gameTable.players[playerIndex].race]);
};