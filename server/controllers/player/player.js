let racesList = require('./racesList');
let rolesList = require('./typesList');

let name;
let id;
let race;
let role;
let board = [];
let hand = [];

function Player(name, race, type){
    this.name = name;
    this.race = racesList.HUMAN;
    this.role = rolesList.NONE;
    this.id = 'eowakoskmzkx';
}

