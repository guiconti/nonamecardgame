const createRoom = require('./game/room/createRoom');
const enterRoom = require('./game/room/enterRoom');
const addPlayer = require('./game/addPlayer');
const startGame = require('./game/startGame');

function getPlayerIndex(gameTable, player) {
    let counter = -1;
    return gameTable.players.some((actualPlayer) => {
        counter++;
        return actualPlayer.id == player.id;
    })?counter:-1;
};

module.exports = {
    createRoom: createRoom,
    enterRoom: enterRoom,
    addPlayer: addPlayer,
    startGame: startGame
};

