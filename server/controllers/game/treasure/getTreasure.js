const Treasure = require('./treasure');
const logger = require('../../../../tools/logger');

module.exports = function(gameTable){
    try {
        var givenTreasureIndex = Math.floor((Math.random() * gameTable.treasures.length));
        var givenTreasure = gameTable.treasures[givenTreasureIndex];
        gameTable.treasures.splice(givenTreasureIndex, 1);

        if (gameTable.treasures.length == 0){
            gameTable.treasures = gameTable.discardTreasures;
            gameTable.discardTreasures = [];
        }

        return givenTreasure;
    } catch(err){
        console.log(err);
        logger.logError(err);
        return undefined;
    }
    
}