let name;
let password;
let id;

function Game(name, password){
    this.name = name;
    this.password = password;
    this.id = 'jsdkjasdu12jkdsjakdl';
}

Game.prototype.id = this.id;

module.exports = Game;