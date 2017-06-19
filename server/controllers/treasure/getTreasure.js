module.exports = function(){
    var givenTreasureIndex = Math.floor((Math.random() * this.treasures.length));
    var givenTreasure = this.treasures[givenTreasureIndex];
    this.treasures.splice(givenTreasureIndex, 1);

    if (this.treasures.length == 0){
        this.treasures = this.discardTreasures;
        this.discardTreasures = [];
    }

    return givenTreasure;
}