const _ = require('underscore');
const eventEmitter = require('../communication/eventEmitter');
const logger = require('../../../tools/logger');

module.exports = (gameTable) => {
    try{
        gameTable.players.forEach((player) => {
            let playerInfo = _.omit(player, '_id', 'communicationId');
            eventEmitter.sendPrivatePlayerInfo(gameTable._id, player.communicationId, JSON.stringify(playerInfo))
        })
        let gameInfoCensored = {
            players: gameTable.players.map((player) => {
                return _.omit(player, 'communicationId', 'hand', '_id');
            }),
            turnInfo: gameTable.turnInfo
        };
        eventEmitter.sendTurnInfo(gameTable._id, JSON.stringify(gameInfoCensored.turnInfo));
        //  Fazer isso no front com o game info?
    } catch(err){
        console.log(err);
        return logger.logError(err);
    }
}