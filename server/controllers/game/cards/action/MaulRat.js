const logger = require('../../../../../tools/logger');
const messagesType = require('../../../communication/messagesType');
const rolesList = require('../../../player/rolesList');

const CARD_NAME = 'Maul Rat';
const MODIFICATION_BONUS = 3;
let successMessage = {
    type: messagesType.MONSTER,
    text: ' is a Cleric so ' + CARD_NAME + ' has ' + MODIFICATION_BONUS + ' more combat power.'
};

let errorMessage = {
    title: 'Unexpect error',
    body: 'Something happened and even we don`t know what it is.'
};

module.exports = (gameTable, playerIndex, eventEmitter) => {
    return new Promise(function (resolve, reject) {
        try {
            if (gameTable.players[playerIndex].role == rolesList.CLERIC){
                gameTable.fight.monster[0].powerBonus += 3;
                eventEmitter.sendChatMessage(gameTable._id, successMessage);
                gameTable.chatHistory.unshift(successMessage);
            }
            resolve();
        } catch (err) {
            logger.logError(err);
            reject(errorMessage);
        }
    });
};
