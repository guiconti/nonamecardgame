const racesList = require('./racesList');
const rolesList = require('./rolesList');

let name;
let id;
let communicationId;
let level;
let combatPower;
let race;
let role;
let board = [];
let hand = [];
let cardsOnHand;

function Player(name, id, communicationId){
    this.name = name;
    this.id = id;
    this.communicationId = communicationId;
    this.level = 1;
    this.combatPower = 1;
    this.race = racesList.HUMAN;
    this.role = rolesList.NONE;
    this.board = [];
    this.hand = [];
    this.cardsOnHand = this.hand.length;
}

module.exports = Player;
