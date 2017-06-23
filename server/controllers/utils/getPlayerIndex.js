const logger = require('../../../tools/logger');

module.exports = (gameTable, player) => {
    try {
        let counter = -1;
        return gameTable.players.some((actualPlayer) => {
            counter++;
            return actualPlayer.id == player.id;
        })?counter:-1;
    } catch(err){
        logger.logError(err);
        return 0;
    }
};