const getTreasure = require('../treasure/getTreasure');
const getDungeon = require('../dungeon/getDungeon');
const insertPlayer = require('./insertPlayer');
const setupGame = require('./setupGame');

let name;
let password;
let treasures = [];
let discardTreasures = [];
let dungeons = [];
let discardDungeons = [];
let players = [];

function newGame(name, password){
    this.name = name;
    this.password = password;
    this.treasures = treasuresList;
    this.dungeons = dungeonsList;
    this.players = [];
}

module.exports = {
    newGame: newGame,
    setupGame: setupGame,
    getTreasure: getTreasure,
    getDungeon: getDungeon
};