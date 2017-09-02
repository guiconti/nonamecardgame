const logger = require('../../../../tools/logger');
const messagesType = require('../../communication/messagesType');
const updateCombatPower = require('../../utils/updateCombatPower');

const CARD_NAME = 'Intelligent';
const MODIFICATION_BONUS = 5;
let effectMessage = {
    type: messagesType.MONSTER,
    text: ' got ' + MODIFICATION_BONUS +  ' more combat power.'
};

let errorMessage = {
    title: 'Unexpect error',
    body: 'Something happened and even we don`t know what it is.'
};

exports.effect = (gameTable, playerIndex, eventEmitter) => {
    return new Promise((resolve, reject) => {
        try {
            gameTable.fight.monster[0].powerBonus += MODIFICATION_BONUS;
            effectMessage.text = gameTable[playerIndex].name + ' played ' + CARD_NAME + ' and ' + gameTable.fight.monster[0].powerBonus + effectMessage.text;
            eventEmitter.sendChatMessage(gameTable._id, effectMessage);
            gameTable.chatHistory.unshift(effectMessage);
            return resolve();
        } catch (err) {
            logger.logError(err);
            return reject(errorMessage);
        }
    });
};