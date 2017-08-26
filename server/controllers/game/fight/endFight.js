const eventEmitter = require('../../communication/eventEmitter');
const messagesType = require('../../communication/messagesType');
const getPlayerIndex = require('../../utils/getPlayerIndex');
const addCardToHand = require('../../player/addCardToHand');
const getTreasure = require('../treasure/getTreasure');
const discardDungeon = require('../dungeon/discardDungeon');
const resetFight = require('./resetFight');
const turnPhases = require('../turnPhases');

module.exports = (gameTable) => {
    let message = {
        type: messagesType.MONSTER,
        text: 'Fight ended!'
    };
    eventEmitter.sendChatMessage(gameTable.id, message);
    gameTable.chatHistory.unshift(message);

    let playerIndex = getPlayerIndex(gameTable, gameTable.turnInfo.playerId);
    let helperIndex = getPlayerIndex(gameTable, gameTable.fight.helper.helperId);

    gameTable.players[playerIndex].level += gameTable.fight.monster[0].levelReward;
    //  TODO: Create a function to update combat power
    gameTable.players[playerIndex].combatPower += gameTable.fight.monster[0].levelReward;
    
    let playerTreasuresAmount = gameTable.fight.monster[0].treasureReward - gameTable.fight.helper.helperTreasures;
    for (let i = 0; i < playerTreasuresAmount; i++){
        addCardToHand(gameTable.players[playerIndex], getTreasure(gameTable));
    }
    message.text = gameTable.players[playerIndex].name + ' won ' + playerTreasuresAmount + ' treasure(s) from the monster';
    eventEmitter.sendChatMessage(gameTable.id, message);
    gameTable.chatHistory.unshift(message);

    if (gameTable.fight.helper.helperTreasures > 0){
        for (let i = 0; i < gameTable.fight.helper.helperTreasures; i++){
            addCardToHand(gameTable.players[helperIndex], getTreasure(gameTable));
        }
        message.text = gameTable.players[helperIndex].name + ' helped and won ' + gameTable.fight.helper.helperTreasures + ' treasure(s) from the monster';
        eventEmitter.sendChatMessage(gameTable.id, message);
        gameTable.chatHistory.unshift(message);
    }

    gameTable.fight.monster.forEach((monster) => {
        discardDungeon(gameTable, monster);
    })
    resetFight(gameTable);
    return;
};
