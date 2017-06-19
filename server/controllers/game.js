const treasuresList = require('./treasure/treasuresList');
const getTreasure = require('./treasure/getTreasure');

let name;
let password;
let id;
let treasures = [];
let discardTreasures = [];
let dungeons = [];
let discardDungeons = [];
let players;

function Game(name, password){
    this.name = name;
    this.password = password;
    this.id = 'jsdkjasdu12jkdsjakdl';
    this.treasures = treasuresList;

}

Game.prototype.id = this.id;
Game.prototype.getTreasure = getTreasure;

module.exports = Game;