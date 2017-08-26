const logger = require('../../../../../tools/logger');
const messagesType = require('../../../communication/messagesType');
const isHighestLevel = require('../../../utils/isHighestLevel');

const cardName = 'Whine At The GM';
const LEVEL_BONUS = 1;
const successMessage = {
    type: messagesType.INFO,
    text: ' used ' + cardName + ' and goes up a level.'
};

const unableToPlayMessage = {
    title: 'You can`t play this card'
};

const errorMessage = {
    title: 'Unexpect error',
    body: 'Something happened and even we don`t know what it is.'
};

module.exports = (gameTable, playerIndex, eventEmitter) => {
    return new Promise(function (resolve, reject) {
        try {
            if (isHighestLevel(gameTable, playerIndex)) {
                unablePlayMessage.body = 'You can`t play this card if you are the player with the highest level.';
                reject(unablePlayMessage);
            }
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
