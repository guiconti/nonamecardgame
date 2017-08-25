const eventEmitter = require('../../communication/eventEmitter');
const sendGameToPlayers = require('../sendGameToPlayers');
const turnPhases = require('../turnPhases');

module.exports = (gameTable) => {
    //  TODO: Change this to front message
    let totalPlayerCombatPower = gameTable.fight.player.combatPower + gameTable.fight.player.powerBonus;
    let totalMonsterCombatPower = gameTable.fight.monster[0].combatPower + gameTable.fight.monster[0].powerBonus;

    if (totalPlayerCombatPower <= totalMonsterCombatPower) {
        gameTable.turnInfo.phase = turnPhases.FIGHT_MONSTER_LOOSING;
        gameTable.fight.finishedInterferes = [];
    } else {
        gameTable.turnInfo.phase = turnPhases.FIGHT_MONSTER_WINNING;
    }
    return;
};
