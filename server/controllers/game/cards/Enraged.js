const logger = require('../../../../tools/logger');
const messagesType = require('../../communication/messagesType');

const CARD_NAME = 'Enraged';
const MODIFICATION_BONUS = 5;
const REWARD_BONUS = 1;
let effectMessage = {
    type: messagesType.MONSTER,
    text: ' got ' + MODIFICATION_BONUS +  ' more combat power'
};

let errorMessage = {
    title: 'Unexpect error',
    body: 'Something happened and even we don`t know what it is.'
};

exports.effect = (gameTable, playerIndex, eventEmitter) => {
    return new Promise((resolve, reject) => {
        try {
            gameTable.fight.monster[0].powerBonus += MODIFICATION_BONUS;
            //  TODO: Fix this so it does not carry after redraw
            gameTable.fight.monster[0].treasureReward += REWARD_BONUS;
            effectMessage.text = gameTable[playerIndex].name + ' played ' + CARD_NAME + ' and ' + gameTable.fight.monster[0].powerBonus + effectMessage.text;
            effectMessage.text += ' but is also rewarding ' + REWARD_BONUS + 'more treasure(s).'
            eventEmitter.sendChatMessage(gameTable._id, effectMessage);
            gameTable.chatHistory.unshift(effectMessage);
            return resolve();
        } catch (err) {
            logger.logError(err);
            return reject(errorMessage);
        }
    });
};