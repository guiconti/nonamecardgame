let name;
let password;
let treasures = [];
let discardTreasures = [];
let dungeons = [];
let discardDungeons = [];
let players = [];
let player;
let turnInfo;

function Game(name, password){
    this.name = name;
    this.password = password;
    this.players = [];
    turnInfo = {
        playerId: '',
        playerName: '',
        phase: 0
    },
    this.treasures = [];
    this.dungeons = [];
}

module.exports = Game;
