const logger = require('../../../../tools/logger');
const messagesType = require('../../communication/messagesType');
const racesList = require('../../player/racesList');
const equipmentsType = require('../treasure/equipmentsType');
const updatePlayerInfo = require('../../player/updatePlayerInfo');
const discardTreasure = require('../treasure/discardTreasure');

const CARD_NAME = 'Drooling Slime';
const MODIFICATION_BONUS = 4;
const LEVELS_LOST = 1;
let effectMessage = {
    type: messagesType.MONSTER,
    text: ' is a Elf so ' + CARD_NAME + ' has ' + MODIFICATION_BONUS + ' more combat power.'
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
            if (gameTable.players[playerIndex].race == racesList.ELF){
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
            for (let i=0; i < gameTable.players[playerIndex].equipment.length; i++){
                if (gameTable.players[playerIndex].equipment[i].equipmentType == equipmentsType.FOOTGEAR){
                    updatePlayerInfo(gameTable, playerIndex, i, false);
                    badThingMessage.text = CARD_NAME + ' caught ' + gameTable.players[playerIndex].name;
                    badThingMessage.text += ' and makes he/she loses ' + gameTable.players[playerIndex].equipment[i].name;
                    eventEmitter.sendChatMessage(gameTable._id, badThingMessage);
                    gameTable.chatHistory.unshift(badThingMessage); 
                    discardTreasure(gameTable, gameTable.players[playerIndex].equipment.splice(i, 1));
                    return resolve();
                }
            }
            gameTable.players[playerIndex].level -= LEVELS_LOST;
            badThingMessage.text = CARD_NAME + ' caught ' + gameTable.players[playerIndex].name;
            badThingMessage.text += ' and makes he/she loses ' + LEVELS_LOST + ' level(s).'; 
            eventEmitter.sendChatMessage(gameTable._id, badThingMessage);
            gameTable.chatHistory.unshift(badThingMessage);
            return resolve();
        } catch (err) {
            logger.logError(err);
            return reject(errorMessage);
        }
    });
};