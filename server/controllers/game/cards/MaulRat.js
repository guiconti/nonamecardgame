const logger = require('../../../../tools/logger');
const messagesType = require('../../communication/messagesType');
const rolesList = require('../../player/rolesList');

const CARD_NAME = 'Maul Rat';
const MODIFICATION_BONUS = 3;
const LEVELS_LOST = 1;
let effectMessage = {
    type: messagesType.MONSTER,
    text: ' is a Cleric so ' + CARD_NAME + ' has ' + MODIFICATION_BONUS + ' more combat power.'
};

let badThingMessage = {
    type: messagesType.MONSTER
};

let errorMessage = {
    title: 'Unexpect error',
    body: 'Something happened and even we don`t know what it is.'
};

exports.effect = (gameTable, playerIndex, eventEmitter) => {
    return new Promise((resolve, reject) => {
        try {
            if (gameTable.players[playerIndex].role == rolesList.CLERIC){
                gameTable.fight.monster[0].powerBonus += MODIFICATION_BONUS;
                eventEmitter.sendChatMessage(gameTable._id, effectMessage);
                gameTable.chatHistory.unshift(effectMessage);
            }
            resolve();
        } catch (err) {
            logger.logError(err);
            reject(errorMessage);
        }
    });
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