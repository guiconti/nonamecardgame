const eventEmitter = require('../communication/eventEmitter');
const racesName = require('./racesName');

module.exports = (gameTable, playerIndex, itemIndex) => {
    gameTable.players[playerIndex].race = gameTable.players[playerIndex].hand[itemIndex].raceType;
    eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' changed his race to ' + racesName[gameTable.players[playerIndex].race]);
};