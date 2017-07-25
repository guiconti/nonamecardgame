const eventEmitter = require('../../communication/eventEmitter');
const turnPhases = require('../turnPhases');

exports.startFight = (gameTable, playerIndex) => {
    if (gameTable.players[playerIndex].combatPower <= gameTable.monster.stats.combatPower) {
        eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' cannot fight it alone. He have to ask for help, use items or run.');
        gameTable.turnInfo.phase = turnPhases.FIGHT_MONSTER_LOOSING;
        //  Enable Run, Item and Help commands
    } else {
        eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' is able to defeat the monster. Will anyone interfere?');
        gameTable.turnInfo.phase = turnPhases.FIGHT_MONSTER_WINNING;
    }
};
exports.askForHelp = (gameTable) => {

};
