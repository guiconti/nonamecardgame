const logger = require('../../../../tools/logger');
const messagesType = require('../../communication/messagesType');
const updateCombatPower = require('../../utils/updateCombatPower');

const CARD_NAME = 'Mr. Bones';
const RUN_PENALIZATION = 1;
const LEVELS_LOST = 2;
let runMessage = {
    type: messagesType.MONSTER,
    text: 'Even when you run Mr. Bones punishes you. '
};

let badThingMessage = {
    type: messagesType.MONSTER
};

let errorMessage = {
    title: 'Unexpect error',
    body: 'Something happened and even we don`t know what it is.'
};

exports.successRun = (gameTable, playerIndex, eventEmitter) => {
    return new Promise((resolve, reject) => {
        try {
            gameTable.players[playerIndex].level -= RUN_PENALIZATION;
            runMessage.text = gameTable.players[playerIndex].name + ' lost ' + RUN_PENALIZATION + ' level(s).';
            updateCombatPower(gameTable, playerIndex);
            eventEmitter.sendChatMessage(gameTable._id, runMessage);
            gameTable.chatHistory.unshift(runMessage);
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
            badThingMessage.text += ' and makes he/she loses ' + LEVELS_LOST + ' level(s).'; 
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