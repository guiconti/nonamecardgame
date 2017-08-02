const eventEmitter = require('../../communication/eventEmitter');
const getPlayerIndex = require('../../utils/getPlayerIndex');
const addCardToHand = require('../../player/addCardToHand');
const getTreasure = require('../treasure/getTreasure');
const turnPhases = require('../turnPhases');

module.exports = (gameTable) => {
    eventEmitter.sendChatMessage(gameTable.id, 'Fight ended!');

    let playerIndex = getPlayerIndex(gameTable, gameTable.turnInfo.playerId);
    let helperIndex = getPlayerIndex(gameTable, gameTable.turnInfo.helperId);

    gameTable.players[playerIndex].level++;
    //  TODO: Create a function to update combat power
    gameTable.players[playerIndex].combatPower++;
    
    let playerTreasuresAmount = gameTable.fight.monster[0].treasureReward - gameTable.turnInfo.helperTreasures;
    for (let i = 0; i < playerTreasuresAmount; i++){
        addCardToHand(gameTable.players[playerIndex], getTreasure(gameTable));
    }
    eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' won ' + playerTreasuresAmount + ' treasure(s) from the monster');

    if (gameTable.turnInfo.helperTreasures > 0){
        for (let i = 0; i < gameTable.turnInfo.helperTreasures; i++){
            addCardToHand(gameTable.players[helperIndex], getTreasure(gameTable));
        }
        eventEmitter.sendChatMessage(gameTable.id, gameTable.players[helperIndex].name + ' helped and won ' + gameTable.turnInfo.helperTreasures + ' treasure(s) from the monster');
    }

    gameTable.fight.finishedInterferes = [];
    gameTable.fight.monster = [];
    gameTable.fight.player = {};
    return;
};
