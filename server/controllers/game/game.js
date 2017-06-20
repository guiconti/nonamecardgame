const getTreasure = require('../treasure/getTreasure');
const getDungeon = require('../dungeon/getDungeon');
const setupGame = require('./setupGame');

let name;
let password;
let treasures = [];
let discardTreasures = [];
let dungeons = [];
let discardDungeons = [];
let players = [];
let player;

function newGame(name, password){
    this.name = name;
    this.password = password;
    this.players = [];
}

module.exports = {
    newGame: newGame,
    setupGame: setupGame,
    getTreasure: getTreasure,
    getDungeon: getDungeon
};
