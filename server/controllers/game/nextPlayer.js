const eventEmitter = require('../communication/eventEmitter');
const messagesType = require('../communication/messagesType');
const getPlayerIndex = require('../utils/getPlayerIndex');
const turnPhases = require('./turnPhases');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');

const HAND_LIMIT = 5;

module.exports = (gameTable, playerIndex) => {

    if (playerIndex != -1){
        let mainPlayerIndex = getPlayerIndex(gameTable, gameTable.turnInfo.playerId);
        let helperIndex = getPlayerIndex(gameTable, gameTable.fight.helper.helperId);

        if (gameTable.players[mainPlayerIndex].cardsOnHand > HAND_LIMIT){
            gameTable.turnInfo.phase = turnPhases.DISCARD_CARDS;
            if (mainPlayerIndex == playerIndex){
                let message = {
                    type: messagesType.INFO,
                    text: 'The game cannot go on because some players have more cards than the maximum allowed.'
                };
                eventEmitter.sendChatMessage(gameTable.id, message);
                gameTable.chatHistory.unshift(message);
            }
            return;
        }
        if (helperIndex != -1) {
            if (gameTable.players[helperIndex].cardsOnHand > HAND_LIMIT){
                gameTable.turnInfo.phase = turnPhases.DISCARD_CARDS;
                if (helperIndex == playerIndex){
                    let message = {
                        type: messagesType.INFO,
                        text: 'The game cannot go on because some players have more cards than the maximum allowed.'
                    };
                   eventEmitter.sendChatMessage(gameTable.id, message);
                   gameTable.chatHistory.unshift(message);
                }
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
    let message = {
        type: messagesType.INFO,
        text: 'It`s ' + gameTable.turnInfo.playerName + ' turn.'
    };
    eventEmitter.sendChatMessage(gameTable._id, message);
    gameTable.chatHistory.unshift(message);
    return;
};
