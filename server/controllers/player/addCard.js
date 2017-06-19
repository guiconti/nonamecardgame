module.exports = function(newCard){

    var givenDungeonIndex = Math.floor((Math.random() * this.dungeons.length));
    var givenDungeon = this.dungeons[givenDungeonIndex];
    this.dungeons.splice(givenDungeonIndex, 1);

    if (this.dungeons.length == 0){
        this.dungeons = this.discardDungeons;
        this.discardDungeons = [];
    }

    return givenDungeon;
}