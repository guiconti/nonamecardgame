const createRoom = require('./game/room/createRoom');
const enterRoom = require('./game/room/enterRoom');
const addPlayer = require('./game/addPlayer');
const startGame = require('./game/startGame');

module.exports = {
    createRoom: createRoom,
    enterRoom: enterRoom,
    addPlayer: addPlayer,
    startGame: startGame
};

