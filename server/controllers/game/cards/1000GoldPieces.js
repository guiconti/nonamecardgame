const logger = require('../../../../tools/logger');
const messagesType = require('../../communication/messagesType');

const CARD_NAME = '1000 Gold Pieces';
const LEVEL_BONUS = 1;
let effectMessage = {
    type: messagesType.INFO,
    text: ' used ' + CARD_NAME + ' and goes up a level.'
};

let errorMessage = {
    title: 'Unexpect error',
    body: 'Something happened and even we don`t know what it is.'
};

exports.effect = (gameTable, playerIndex, eventEmitter) => {
    return new Promise(function (resolve, reject) {
        try {
            gameTable.players[playerIndex].level += LEVEL_BONUS;
            effectMessage.text = gameTable.players[playerIndex].name + effectMessage.text;
            eventEmitter.sendChatMessage(gameTable._id, effectMessage);
            gameTable.chatHistory.unshift(effectMessage);
            resolve(sucessMessage);
        } catch (err) {
            logger.logError(err);
            reject(errorMessage);
        }
    });
};
