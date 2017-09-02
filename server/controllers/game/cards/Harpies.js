const logger = require('../../../../tools/logger');
const messagesType = require('../../communication/messagesType');
const rolesList = require('../../player/rolesList');
const updateCombatPower = require('../../utils/updateCombatPower');

const CARD_NAME = 'Harpies';
const LEVELS_LOST = 2;
const MODIFICATION_BONUS = 5;

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
            if (gameTable.players[playerIndex].role == rolesList.WIZARD){
                gameTable.fight.monster[0].powerBonus += MODIFICATION_BONUS;
                eventEmitter.sendChatMessage(gameTable._id, effectMessage);
                gameTable.chatHistory.unshift(effectMessage);
            }
            return resolve();
        } catch (err) {
            logger.logError(err);
            return reject(errorMessage);
        }
    });
};

exports.badThing = (gameTable, playerIndex, eventEmitter) => {
    return new Promise((resolve, reject) => {
        try {
            gameTable.players[playerIndex].level -= LEVELS_LOST;
            badThingMessage.text = CARD_NAME + ' caught ' + gameTable.players[playerIndex].name;
            badThingMessage.text += ' and makes he/she loses ' + LEVELS_LOST + ' levels.'; 
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