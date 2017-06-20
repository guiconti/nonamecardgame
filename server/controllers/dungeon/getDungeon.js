module.exports = function(gameTable){
    var givenDungeonIndex = Math.floor((Math.random() * gameTable.dungeons.length));
    var givenDungeon = gameTable.dungeons[givenDungeonIndex];
    gameTable.dungeons.splice(givenDungeonIndex, 1);

    if (gameTable.dungeons.length == 0){
        gameTable.dungeons = gameTable.discardDungeons;
        gameTable.discardDungeons = [];
    }

    return givenDungeon;
}