let name;
let password;
let ownerId;
let treasures = [];
let discardTreasures = [];
let dungeons = [];
let discardDungeons = [];
let players = [];
let player;
let turnInfo;

function Game(name, password, ownerId){
    this.name = name;
    this.password = password;
    this.ownerId = ownerId;
    this.players = [];
    this.turnInfo = {
        playerId: '',
        playerName: '',
        phase: 0,
        pendingAnswer: {
            playerId: ''
        }
    },
    this.treasures = [];
    this.discardedTreasures = [];
    this.dungeons = [];
    this.discardedDungeons = [];
}

module.exports = Game;
