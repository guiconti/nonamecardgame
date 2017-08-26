const logger = require('../../../../../tools/logger');
const messagesType = require('../../../communication/messagesType');
const racesList = require('../../../player/racesList');
const updateCombatPower = require('../../../utils/updateCombatPower');

const cardName = 'Bad-Ass Bandanna';
const EQUIPMENT_BONUS = 3;
const successMessage = {
    type: messagesType.INFO,
    text: ' equipped ' + cardName + ' and his/her combat power goes up to .'
};

const unableToPlayMessage = {
    title: 'You can`t play this card'
};

const errorMessage = {
    title: 'Unexpect error',
    body: 'Something happened and even we don`t know what it is.'
};

module.exports = (gameTable, playerIndex, eventEmitter) => {
    return new Promise(function (resolve, reject) {
        try {
            if (gameTable.players[playerIndex].race != racesList.HUMAN) {
                unablePlayMessage.body = 'You can`t play this card if you are not a human.';
                reject(unablePlayMessage);
            }
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
