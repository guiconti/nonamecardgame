const racesList = require('./racesList');
const rolesList = require('./rolesList');

let name;
let id;
let communicationId;
let level;
let equipmentBonus;
let combatPower;
let race;
let role;
let equipment = [];
let hand = [];
let cardsOnHand;

function Player(name, id, communicationId){
    this.name = name;
    this.id = id;
    this.communicationId = communicationId;
    this.level = 1;
    this.equipmentBonus = 0;
    this.combatPower = this.level + this.equipmentBonus;
    this.race = racesList.HUMAN;
    this.role = rolesList.NONE;
    this.equipment = [];
    this.hand = [];
    this.cardsOnHand = this.hand.length;
}

module.exports = Player;
