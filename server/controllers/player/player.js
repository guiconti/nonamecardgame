const racesList = require('./racesList');
const rolesList = require('./rolesList');
const sexList = require('./sexList');

let name;
let id;
let communicationId;
let level;
let race;
let role;
let sex;
let equipmentBonus;
let combatPower;
let equipment = [];
let hand = [];
let cardsOnHand;

function Player(name, id, communicationId){
    this.name = name;
    this.id = id;
    this.communicationId = communicationId;
    this.level = 1;
    this.race = racesList.HUMAN;
    this.role = rolesList.NONE;
    this.sex = sexList.NONE;
    this.equipmentBonus = 0;
    this.combatPower = this.level + this.equipmentBonus;
    this.equipment = [];
    this.hand = [];
    this.cardsOnHand = this.hand.length;
}

module.exports = Player;
