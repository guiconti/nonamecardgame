const eventEmitter = require('../communication/eventEmitter');

exports.startFight = (gameTable, playerIndex) => {
    if (gameTable.players[playerIndex].combatPower <= gameTable.monster.stats.combatPower) {
        eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' cannot fight it alone. He have to ask for help, use items or run.');
    } else {
        eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' is able to defeat the monster. Will anyone interfere?');
    }
};