const eventEmitter = require('../../communication/eventEmitter');
const sendGameToPlayers = require('../sendGameToPlayers');
const turnPhases = require('../turnPhases');

exports.startFight = (gameTable, playerIndex) => {
    eventEmitter.sendChatMessage(gameTable.id, 'It`s a monster!');
    //  TODO: Change this to front message
    eventEmitter.sendChatMessage(gameTable.id, gameTable.fight.monster[0].name + ' Power: ' + gameTable.fight.monster[0].combatPower + ' Treasures: ' + gameTable.fight.monster[0].treasureReward);
    if (gameTable.players[playerIndex].combatPower <= gameTable.fight.monster[0].combatPower) {
        eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' cannot fight it alone. He have to ask for help, use items or run.');
        gameTable.turnInfo.phase = turnPhases.FIGHT_MONSTER_LOOSING;
        //  Enable Run, Item and Help commands
    } else {
        eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' is able to defeat the monster. Will anyone interfere?');
        gameTable.turnInfo.phase = turnPhases.FIGHT_MONSTER_WINNING;
    }
    sendGameToPlayers(gameTable);
};
exports.askForHelp = (gameTable) => {

};
