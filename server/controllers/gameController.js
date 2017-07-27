const createRoom = require('./game/room/createRoom');
const enterRoom = require('./game/room/enterRoom');
const addPlayer = require('./game/addPlayer');
const startGame = require('./game/startGame');
const pickDungeon = require('./game/pickDungeon');
const askHelp = require('./game/fight/askHelp');
const acceptHelp = require('./game/fight/acceptHelp');
const refuseHelp = require('./game/fight/refuseHelp');

module.exports = {
    createRoom: createRoom,
    enterRoom: enterRoom,
    addPlayer: addPlayer,
    startGame: startGame,
    pickDungeon: pickDungeon,
    askHelp: askHelp,
    acceptHelp: acceptHelp,
    refuseHelp: refuseHelp
};

