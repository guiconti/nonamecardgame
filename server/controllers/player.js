let name;
let race;
let type;

function Player(name, race, type){
    this.name = name;
    this.race = race;
    this.type = type;
}

Player.prototype.getName = () => {
    return this.name;
}