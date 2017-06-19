const treasuresList = require('./treasure/treasuresList');
const dungeonsList = require('./dungeon/dungeonsList');
const getTreasure = require('./treasure/getTreasure');
const getDungeon = require('./dungeon/getDungeon');

let name;
let password;
let id;
let treasures = [];
let discardTreasures = [];
let dungeons = [];
let discardDungeons = [];
let players = [];

function Game(name, password){
    this.name = name;
    this.password = password;
    this.id = 'jsdkjasdu12jkdsjakdl';
    this.treasures = treasuresList;
    this.dungeons = dungeonsList;
}

Game.prototype.id = this.id;
Game.prototype.getTreasure = getTreasure;
Game.prototype.getDungeon = getDungeon;

module.exports = Game;