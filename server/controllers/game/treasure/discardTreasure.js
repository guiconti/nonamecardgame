const logger = require('../../../../tools/logger');

module.exports = function(gameTable, discardedTreasure){
    try {
        if (Array.isArray(discardedTreasure)){
            gameTable.discardedTreasures.push(discardedTreasure[0]);
        } else {
            gameTable.discardedTreasures.push(discardedTreasure);
        }
        return;
    } catch(err){
        console.log(err);
        logger.logError(err);
        return;
    }   
};
