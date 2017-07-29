const logger = require('../../../../tools/logger');

module.exports = (gameTable) => {
    try {
        gameTable.table.monster.name = '';
        gameTable.table.monster.stats.combatPower = 0;
        gameTable.table.monster.stats.treasureAmount = 0;
        //  Add monster to discard pile
        return;
    } catch (err){
        logger.log(error);
        return;
    }
};
