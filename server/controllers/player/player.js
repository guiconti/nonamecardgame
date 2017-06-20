const racesList = require('./racesList');
const rolesList = require('./rolesList');
const addCard = require('./addCard'); 

let name;
let id;
let race;
let role;
let board = [];
let hand = [];

function Player(name){
    this.name = name;
    this.id = 'eowakoskmzkx';
    this.race = racesList.HUMAN;
    this.role = rolesList.NONE;
    this.board = [];
    this.hand = [];
}

Player.prototype.addCard = addCard;

module.exports = Player;
