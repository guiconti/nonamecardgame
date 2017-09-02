const logger = require('../../../../tools/logger');
const messagesType = require('../../communication/messagesType');

const CARD_NAME = 'Lose 1 Level';
const LEVELS_LOST = 1;
let effectMessage = {
    type: messagesType.MONSTER,
    text: ' got ' + MODIFICATION_BONUS +  ' more combat power'
};

let errorMessage = {
    title: 'Unexpect error',
    body: 'Something happened and even we don`t know what it is.'
};

exports.effect = (gameTable, playerIndex, eventEmitter) => {
    return new Promise((resolve, reject) => {
        try {
            gameTable.players[playerIndex].level -= LEVELS_LOST;
            badThingMessage.text = gameTable.players[playerIndex].name + ' received a curse that';
            badThingMessage.text += ' makes he/she loses ' + LEVELS_LOST + ' level(s).'; 
            eventEmitter.sendChatMessage(gameTable._id, effectMessage);
            gameTable.chatHistory.unshift(effectMessage);
            return resolve();
        } catch (err) {
            logger.logError(err);
            return reject(errorMessage);
        }
    });
};