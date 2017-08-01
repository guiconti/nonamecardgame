const eventEmitter = require('../../communication/eventEmitter');
const calculateFightResult = require('./calculateFightResult');
const sendGameToPlayers = require('../sendGameToPlayers');
const turnPhases = require('../turnPhases');

exports.startFight = (gameTable, playerIndex) => {
    eventEmitter.sendChatMessage(gameTable.id, 'It`s a monster!');
    //  TODO: Change this to front message
    eventEmitter.sendChatMessage(gameTable.id, gameTable.fight.monster[0].name + ' Power: ' + gameTable.fight.monster[0].combatPower + ' Treasures: ' + gameTable.fight.monster[0].treasureReward);
    gameTable.fight.player.combatPower = gameTable.players[playerIndex].combatPower;
    calculateFightResult(gameTable);
    if (gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_LOOSING) {
        eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' cannot fight it alone. He have to ask for help, use items or run.');
        //  Enable Run, Item and Help commands
    } else {
        eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' is able to defeat the monster. Will anyone interfere?');
    }
    sendGameToPlayers(gameTable);
};
