const getTreasure = require('../treasure/getTreasure');
const getDungeon = require('../dungeon/getDungeon');
const treasuresList = require('../treasure/treasuresList');
const dungeonsList = require('../dungeon/dungeonsList');

module.exports = function(gameTable){
    gameTable.active = true;
    gameTable.treasures = treasuresList;
    gameTable.dungeons = dungeonsList;
    gameTable.players.forEach((player) => {
        player.hand.push(getTreasure(gameTable));
        player.hand.push(getTreasure(gameTable));
        player.hand.push(getDungeon(gameTable));
        player.hand.push(getDungeon(gameTable));
    });
    return;
}