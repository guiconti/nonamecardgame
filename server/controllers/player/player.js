const racesList = require('./racesList');
const rolesList = require('./rolesList');
const addCard = require('./addCard'); 

let name;
let id;
let race;
let role;
let board = [];
let hand = [];

function Player(name, id){
    this.name = name;
    this.id = id;
    this.race = racesList.HUMAN;
    this.role = rolesList.NONE;
    this.board = [];
    this.hand = [];
}

Player.prototype.addCard = addCard;

module.exports = Player;
