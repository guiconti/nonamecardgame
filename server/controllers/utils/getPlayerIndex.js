const logger = require('../../../tools/logger');

module.exports = (gameTable, playerId) => {
    try {
        let counter = -1;
        return gameTable.players.some((actualPlayer) => {
            counter++;
            return actualPlayer.id == playerId;
        })?counter:-1;
    } catch(err){
        logger.logError(err);
        return -1;
    }
};