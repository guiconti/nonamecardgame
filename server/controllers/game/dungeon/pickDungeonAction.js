const _ = require('underscore');
const dungeonsType = require('./dungeonsType');
const eventEmitter = require('../../communication/eventEmitter');
const turnPhases = require('../turnPhases');
const nextPlayer = require('../nextPlayer');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const monsterFight = require('../fight/monsterFight');
const addCardToHand = require('../../player/addCardToHand');
const sendGameToPlayers = require('../sendGameToPlayers');

module.exports = (gameTable, playerIndex, dungeonPicked) => {                                                                                                                                                                                                         
    eventEmitter.sendChatMessage(gameTable._id, gameTable.players[playerIndex].name + ' picked a dungeon.');
    //  TODO: fail proof
    //  TODO: Improve this
    switch(dungeonPicked.cardType){
        case dungeonsType.MONSTER:
            monsterPick(gameTable, playerIndex, dungeonPicked);
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

function monsterPick(gameTable, playerIndex, monsterPicked){
    //  TODO: fail proof
    gameTable.fight.monster = monsterPicked;
    monsterFight.startFight(gameTable, playerIndex);
    return;
}

function noActionPick(gameTable, playerIndex, dungeonPicked){
    eventEmitter.sendChatMessage(gameTable.id, 'It`s not a monster or a curse so ' + gameTable.players[playerIndex].name + ' added the card to his/her hand.');
    addCardToHand(gameTable.players[playerIndex], dungeonPicked);
    let playerInfo = _.omit(gameTable.toObject().players[playerIndex], '_id', 'communicationId');
    eventEmitter.sendPrivatePlayerInfo(gameTable._id, gameTable.players[playerIndex].communicationId, JSON.stringify(playerInfo));
    if (gameTable.turnInfo.phase == turnPhases.DRAW_FIRST_DUNGEON){
        eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' can now pick a second dungeon.');
        gameTable.turnInfo.phase = turnPhases.DRAW_SECOND_DUNGEON;
        sendGameToPlayers(gameTable);
        return;
    }
    nextPlayer(gameTable, playerIndex);
    sendGameToPlayers(gameTable);
    return;
}
