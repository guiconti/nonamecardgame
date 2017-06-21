const Treasure = require('./treasure');

module.exports = function(gameTable){
    var givenTreasureIndex = Math.floor((Math.random() * gameTable.treasures.length));
    var givenTreasure = gameTable.treasures[givenTreasureIndex];
    gameTable.treasures.splice(givenTreasureIndex, 1);

    if (gameTable.treasures.length == 0){
        gameTable.treasures = gameTable.discardTreasures;
        gameTable.discardTreasures = [];
    }

    return givenTreasure;
}