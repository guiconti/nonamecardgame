const logger = require('../../../../../tools/logger');
const messagesType = require('../../../communication/messagesType');

const cardName = 'Bribe GM With Food';
const LEVEL_BONUS = 1;
const successMessage = {
    type: messagesType.INFO,
    text: ' used ' + cardName + ' and goes up a level.'
};

const errorMessage = {
    title: 'Unexpect error',
    body: 'Something happened and even we don`t know what it is.'
};

module.exports = (gameTable, playerIndex, eventEmitter) => {
    return new Promise(function (resolve, reject) {
        try {
            gameTable.players[playerIndex].level += LEVEL_BONUS;
            successMessage.text = gameTable.players[playerIndex].name + successMessage.text;
            eventEmitter.sendChatMessage(gameTable._id, successMessage);
            gameTable.chatHistory.unshift(successMessage);
            resolve(sucessMessage);
        } catch (err) {
            logger.logError(err);
            reject(errorMessage);
        }
    });
};
