const logger = require('../../../../tools/logger');
const messagesType = require('../../communication/messagesType');
const updateCombatPower = require('../../utils/updateCombatPower');

const CARD_NAME = 'Gelatinous Octahedron';

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
            //  TODO: Implement lose big items
            badThingMessage.text = CARD_NAME + ' caught ' + gameTable.players[playerIndex].name;
            badThingMessage.text += ' and makes he/she loses all his/her big items.'; 
            updateCombatPower(gameTable, playerIndex);
            eventEmitter.sendChatMessage(gameTable._id, badThingMessage);
            gameTable.chatHistory.unshift(badThingMessage);
            return resolve();
        } catch (err) {
            logger.logError(err);
            return reject(errorMessage);
        }
    });
};