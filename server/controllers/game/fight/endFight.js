const eventEmitter = require('../../communication/eventEmitter');
const messagesType = require('../../communication/messagesType');
const getPlayerIndex = require('../../utils/getPlayerIndex');
const addCardToHand = require('../../player/addCardToHand');
const getTreasure = require('../treasure/getTreasure');
const discardDungeon = require('../dungeon/discardDungeon');
const turnPhases = require('../turnPhases');

module.exports = (gameTable) => {
    let message = {
        type: messagesType.MONSTER,
        text: 'Fight ended!'
    };
    eventEmitter.sendChatMessage(gameTable.id, message);
    gameTable.chatHistory.unshift(message);

    let playerIndex = getPlayerIndex(gameTable, gameTable.turnInfo.playerId);
    let helperIndex = getPlayerIndex(gameTable, gameTable.turnInfo.helperId);

    gameTable.players[playerIndex].level += gameTable.fight.monster[0].levelReward;
    //  TODO: Create a function to update combat power
    gameTable.players[playerIndex].combatPower += gameTable.fight.monster[0].levelReward;
    
    let playerTreasuresAmount = gameTable.fight.monster[0].treasureReward - gameTable.turnInfo.helperTreasures;
    for (let i = 0; i < playerTreasuresAmount; i++){
        addCardToHand(gameTable.players[playerIndex], getTreasure(gameTable));
    }
    message.text = gameTable.players[playerIndex].name + ' won ' + playerTreasuresAmount + ' treasure(s) from the monster';
    eventEmitter.sendChatMessage(gameTable.id, message);
    gameTable.chatHistory.unshift(message);

    if (gameTable.turnInfo.helperTreasures > 0){
        for (let i = 0; i < gameTable.turnInfo.helperTreasures; i++){
            addCardToHand(gameTable.players[helperIndex], getTreasure(gameTable));
        }
        message.text = gameTable.players[helperIndex].name + ' helped and won ' + gameTable.turnInfo.helperTreasures + ' treasure(s) from the monster';
        eventEmitter.sendChatMessage(gameTable.id, message);
        gameTable.chatHistory.unshift(message);
    }

    gameTable.fight.monster.forEach((monster) => {
        discardDungeon(gameTable, monster);
    })
    gameTable.fight.finishedInterferes = [];
    gameTable.fight.monster = [];
    gameTable.fight.player = {};
    return;
};
