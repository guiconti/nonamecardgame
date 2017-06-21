let name;
let password;
let treasures = [];
let discardTreasures = [];
let dungeons = [];
let discardDungeons = [];
let players = [];
let player;

function Game(name, password){
    this.name = name;
    this.password = password;
    this.players = [];
}

module.exports = Game;
