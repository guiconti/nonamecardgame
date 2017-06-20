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
    this.race = racesList.HUMAN;
    this.role = rolesList.NONE;
    this.id = 'eowakoskmzkx';
}

Player.prototype.addCard = addCard;

