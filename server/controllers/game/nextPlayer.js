const eventEmitter = require('../communication/eventEmitter');
const getPlayerIndex = require('../utils/getPlayerIndex');
const turnPhases = require('./turnPhases');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');

const HAND_LIMIT = 5;

module.exports = (gameTable, playerIndex) => {

    if (playerIndex != -1){
        let helperIndex = getPlayerIndex(gameTable, gameTable.turnInfo.helperId);

        if (gameTable.players[playerIndex].cardsOnHand > HAND_LIMIT){
            gameTable.turnInfo.phase = turnPhases.DISCARD_CARDS;
            return;
        }
        if (helperIndex != -1) {
            if (gameTable.players[helperIndex].cardsOnHand > HAND_LIMIT){
                gameTable.turnInfo.phase = turnPhases.DISCARD_CARDS;
                return;
            }
        }
    }
  
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
