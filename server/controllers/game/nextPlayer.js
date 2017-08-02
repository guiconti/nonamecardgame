const eventEmitter = require('../communication/eventEmitter');
const turnPhases = require('./turnPhases');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');

module.exports = (gameTable, playerIndex) => {

    //  TODO: Improve this with dice result
    playerIndex = playerIndex >= gameTable.players.length - 1?0:playerIndex + 1;
    gameTable.turnInfo = {
        playerId: gameTable.players[playerIndex].id,
        playerName: gameTable.players[playerIndex].name,
        helperId: '',
        helperName: '',
        helperTreasures: 0,
        phase: turnPhases.DRAW_FIRST_DUNGEON
    };
    eventEmitter.sendChatMessage(gameTable._id, 'It`s ' + gameTable.turnInfo.playerName + ' turn.');
    return;
};
