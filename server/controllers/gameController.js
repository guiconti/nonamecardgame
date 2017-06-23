const createRoom = require('./game/room/createRoom');
const enterRoom = require('./game/room/enterRoom');
const addPlayer = require('./game/addPlayer');
const startGame = require('./game/startGame');
const pickDungeon = require('./game/pickDungeon');

module.exports = {
    createRoom: createRoom,
    enterRoom: enterRoom,
    addPlayer: addPlayer,
    startGame: startGame,
    pickDungeon: pickDungeon
};

