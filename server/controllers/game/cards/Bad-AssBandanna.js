const logger = require('../../../../tools/logger');
const messagesType = require('../../communication/messagesType');
const racesList = require('../../player/racesList');
const updateCombatPower = require('../../utils/updateCombatPower');

const CARD_NAME = 'Bad-Ass Bandanna';
const EQUIPMENT_BONUS = 3;
let effectMessage = {
    type: messagesType.INFO,
    text: ' equipped ' + CARD_NAME + ' and his/her combat power goes up to .'
};

let unableToPlayMessage = {
    title: 'You can`t play this card'
};

let errorMessage = {
    title: 'Unexpect error',
    body: 'Something happened and even we don`t know what it is.'
};

exports.effect = (gameTable, playerIndex, eventEmitter) => {
    return new Promise(function (resolve, reject) {
        try {
            if (gameTable.players[playerIndex].race != racesList.HUMAN) {
                unablePlayMessage.body = 'You can`t play this card if you are not a human.';
                reject(unablePlayMessage);
            }
            gameTable.players[playerIndex].equipmentBonus += EQUIPMENT_BONUS;
            updateCombatPower(gameTable, playerIndex);
            effectMessage.text = gameTable.players[playerIndex].name + effectMessage.text + EQUIPMENT_BONUS;
            eventEmitter.sendChatMessage(gameTable._id, effectMessage);
            gameTable.chatHistory.unshift(effectMessage);
            resolve(sucessMessage);
        } catch (err) {
            logger.logError(err);
            reject(errorMessage);
        }
    });
};
