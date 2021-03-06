const logger = require('../../../../tools/logger');
const messagesType = require('../../communication/messagesType');
const rolesList = require('../../player/rolesList');
const updateCombatPower = require('../../utils/updateCombatPower');

const CARD_NAME = 'Pointy Hat Of Power';
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
            if (gameTable.players[playerIndex].role != rolesList.WIZARD) {
                unablePlayMessage.body = 'You can`t play this card if you are not a wizard.';
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
