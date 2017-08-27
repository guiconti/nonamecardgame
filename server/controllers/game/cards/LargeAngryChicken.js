const logger = require('../../../../tools/logger');
const messagesType = require('../../communication/messagesType');

const CARD_NAME = 'Large Angry Chicken';
const LEVELS_LOST = 1;

let badThingMessage = {
    type: messagesType.MONSTER
};

let errorMessage = {
    title: 'Unexpect error',
    body: 'Something happened and even we don`t know what it is.'
};

exports.badThing = (gameTable, playerIndex, eventEmitter) => {
    return new Promise((resolve, reject) => {
        try {
            gameTable.players[playerIndex].level -= LEVELS_LOST;
            badThingMessage.text = CARD_NAME + ' caught ' + gameTable.players[playerIndex].name;
            badThingMessage.text += ' and makes he/she loses ' + LEVELS_LOST + ' level(s).'; 
            eventEmitter.sendChatMessage(gameTable._id, badThingMessage);
            gameTable.chatHistory.unshift(badThingMessage);
            resolve();
        } catch (err) {
            logger.logError(err);
            reject(errorMessage);
        }
    });
};