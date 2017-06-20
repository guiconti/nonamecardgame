const treasuresList = require('../treasure/treasuresList');
const dungeonsList = require('../dungeon/dungeonsList');
const getTreasure = require('../treasure/getTreasure');
const getDungeon = require('../dungeon/getDungeon');
const insertPlayer = require('./insertPlayer');

let name;
let password;
let treasures = [];
let discardTreasures = [];
let dungeons = [];
let discardDungeons = [];
let players = [];

function Game(name, password){
    this.name = name;
    this.password = password;
    this.treasures = treasuresList;
    this.dungeons = dungeonsList;
    this.players = [];
}

Game.prototype.getTreasure = getTreasure;
Game.prototype.getDungeon = getDungeon;
Game.prototype.insertPlayer = insertPlayer;

module.exports = Game;