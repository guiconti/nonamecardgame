const dungeonsType = require('./dungeonsType');
const eventEmitter = require('../../communication/eventEmitter');
const turnPhases = require('../turnPhases');
const nextPlayer = require('../nextPlayer');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');

module.exports = (gameTable, playerIndex, dungeonPicked) => {                                                                                                                                                                                                         

    eventEmitter.sendChatMessage(gameTable._id, gameTable.players[playerIndex].name + ' picked a dungeon.');
    //  TODO: fail proof
    //  TODO: Improve this
    switch(dungeonPicked.cardType){
        case dungeonsType.MONSTER:
            noActionPick(gameTable, playerIndex, dungeonPicked);
            break;
        case dungeonsType.CURSE:
            noActionPick(gameTable, playerIndex, dungeonPicked);
            break;
        case dungeonsType.RACE:
            noActionPick(gameTable, playerIndex, dungeonPicked);
            break;          
        case dungeonsType.ROLE:
            noActionPick(gameTable, playerIndex, dungeonPicked);
            break;
        case dungeonsType.USABLE:
            noActionPick(gameTable, playerIndex, dungeonPicked);
            break;
    }
    return;
};

function noActionPick(gameTable, playerIndex, dungeonPicked){

    eventEmitter.sendChatMessage(gameTable.id, 'It`s not a monster or a curse so ' + gameTable.players[playerIndex].name + ' added the card to his/her hand.');
    gameTable.players[playerIndex].hand.push(dungeonPicked);
    if (gameTable.turnInfo.phase == turnPhases.DRAW_FIRST_DUNGEON){
        gameTable.turnInfo.phase = turnPhases.DRAW_SECOND_DUNGEON;
        return;
    }
    nextPlayer(gameTable, playerIndex);
    return;
}
