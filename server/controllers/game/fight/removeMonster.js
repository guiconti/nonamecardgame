const logger = require('../../../../tools/logger');

module.exports = (gameTable) => {
    try {
        gameTable.fight.monster[0].name = '';
        gameTable.fight.monster[0].combatPower = 0;
        gameTable.fight.monster[0].treasureAmount = 0;
        //  Add monster to discard pile
        return;
    } catch (err){
        logger.logError(err);
        return;
    }
};
