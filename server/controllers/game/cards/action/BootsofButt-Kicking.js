const logger = require('../../../../../tools/logger');
const messagesType = require('../../../communication/messagesType');
const updateCombatPower = require('../../../utils/updateCombatPower');

const CARD_NAME = 'Boots of Butt-Kicking';
const EQUIPMENT_BONUS = 2;
let successMessage = {
    type: messagesType.INFO,
    text: ' equipped ' + CARD_NAME + ' and his/her combat power goes up to .'
};

let errorMessage = {
    title: 'Unexpect error',
    body: 'Something happened and even we don`t know what it is.'
};

module.exports = (gameTable, playerIndex, eventEmitter) => {
    return new Promise(function (resolve, reject) {
        try {
            gameTable.players[playerIndex].equipmentBonus += EQUIPMENT_BONUS;
            updateCombatPower(gameTable, playerIndex);
            successMessage.text = gameTable.players[playerIndex].name + successMessage.text + EQUIPMENT_BONUS;
            eventEmitter.sendChatMessage(gameTable._id, successMessage);
            gameTable.chatHistory.unshift(successMessage);
            resolve(sucessMessage);
        } catch (err) {
            logger.logError(err);
            reject(errorMessage);
        }
    });
};
