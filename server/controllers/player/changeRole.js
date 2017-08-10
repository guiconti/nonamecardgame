const eventEmitter = require('../communication/eventEmitter');
const messagesType = require('../communication/messagesType');
const rolesName = require('./rolesName');

module.exports = (gameTable, playerIndex, newRole) => {
    gameTable.players[playerIndex].role = newRole;
    let message = {
        type: messagesType.INFO,
        text: gameTable.players[playerIndex].name + ' changed his role to ' + rolesName[gameTable.players[playerIndex].role]
    };
    eventEmitter.sendChatMessage(gameTable.id, message);
};
