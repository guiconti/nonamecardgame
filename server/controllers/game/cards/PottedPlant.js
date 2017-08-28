const logger = require('../../../../tools/logger');
const messagesType = require('../../communication/messagesType');
const racesList = require('../../player/racesList');

const CARD_NAME = 'Potted Plant';
const BONUS_WON = 1;
let wonMessage = {
    type: messagesType.MONSTER,
    text: ' is a Elf so he/she won ' + BONUS_WON + ' more treasure.'
};

let badThingMessage = {
    type: messagesType.MONSTER,
    msg: 'Nothing happens, a plant can`t chase dummy.' 
};

let errorMessage = {
    title: 'Unexpect error',
    body: 'Something happened and even we don`t know what it is.'
};

exports.death = (gameTable, playerIndex, eventEmitter) => {
    return new Promise((resolve, reject) => {
        try {
            if (gameTable.players[playerIndex].race == racesList.ELF){
                gameTable.fight.monster[0].treasureReward += BONUS_WON;
                eventEmitter.sendChatMessage(gameTable._id, wonMessage);
                gameTable.chatHistory.unshift(wonMessage);
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
            eventEmitter.sendChatMessage(gameTable._id, badThingMessage);
            gameTable.chatHistory.unshift(badThingMessage);
            return resolve();
        } catch (err) {
            logger.logError(err);
            return reject(errorMessage);
        }
    });
};