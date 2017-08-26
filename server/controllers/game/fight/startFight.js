const eventEmitter = require('../../communication/eventEmitter');
const messagesType = require('../../communication/messagesType');
const calculateFightResult = require('./calculateFightResult');
const sendGameToPlayers = require('../sendGameToPlayers');
const turnPhases = require('../turnPhases');

module.exports = (gameTable, playerIndex) => {
    let message = {
        type: messagesType.MONSTER,
        text: 'It`s a monster!'
    };
    eventEmitter.sendChatMessage(gameTable.id, message);
    gameTable.chatHistory.unshift(message);
    //  TODO: Change this to front message
    message.text = gameTable.fight.monster[0].name + ' Power: ' + gameTable.fight.monster[0].combatPower + ' Treasures: ' 
        + gameTable.fight.monster[0].treasureReward;
    eventEmitter.sendChatMessage(gameTable.id, message);
    gameTable.chatHistory.unshift(message);
    gameTable.fight.finishedInterferes = [];
    gameTable.fight.player.combatPower = gameTable.players[playerIndex].combatPower;
    //  TODO: Apply monster action
    calculateFightResult(gameTable);
    if (gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_LOOSING) {
        message.text = gameTable.players[playerIndex].name + ' cannot fight it alone. He have to ask for help, use items or run.';
        eventEmitter.sendChatMessage(gameTable.id, message);
        gameTable.chatHistory.unshift(message);
        //  Enable Run, Item and Help commands
    } else {
        message.text = gameTable.players[playerIndex].name + ' is able to defeat the monster. Will anyone interfere?';
        eventEmitter.sendChatMessage(gameTable.id, message);
        gameTable.chatHistory.unshift(message);
    }
    sendGameToPlayers(gameTable);
};
