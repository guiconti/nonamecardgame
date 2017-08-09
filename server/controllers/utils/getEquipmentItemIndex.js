const logger = require('../../../tools/logger');

module.exports = (gameTable, playerIndex, itemId) => {
    try {
        let counter = -1;
        return gameTable.players[playerIndex].equipment.some((actualItem) => {
            counter++;
            return actualItem._id == itemId;
        })?counter:-1;
    } catch(err){
        logger.logError(err);
        return -1;
    }
};