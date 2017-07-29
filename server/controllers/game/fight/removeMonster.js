const logger = require('../../../../tools/logger');

module.exports = (gameTable) => {
    try {
        gameTable.table.monster[0].name = '';
        gameTable.table.monster[0].stats.combatPower = 0;
        gameTable.table.monster[0].stats.treasureAmount = 0;
        //  Add monster to discard pile
        return;
    } catch (err){
        logger.logError(err);
        return;
    }
};
