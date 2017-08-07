const logger = require('../../../../tools/logger');

module.exports = function(gameTable, discardedDungeon){
    try {
        if (Array.isArray(discardedDungeon)){
            gameTable.discardedDungeons.push(discardedDungeon[0]);
        } else {
            gameTable.discardedDungeons.push(discardedDungeon);
        }
        return;
    } catch(err){
        console.log(err);
        logger.logError(err);
        return;
    }   
};
