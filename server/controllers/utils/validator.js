const _ = require('underscore');

exports.isValidGame = (gameInfo) => {
    try{
        return (_.isString(gameInfo.name) && gameInfo.name.trim().length > 0) && 
            (_.isUndefined(gameInfo.password) || (_.isString(gameInfo.assword) && gameInfo.password.trim().length > 0));
    } catch (e){
        return false;
    }
};

exports.isValidGameId = (gameId) => {
    return _.isString(gameId) && gameId.trim().length > 0;
};

exports.isValidPlayer = (playerInfo) => {
    try{
        return _.isString(playerInfo.name) && playerInfo.name.trim().length > 0;
    } catch (e){
        return false;
    }
};

exports.isValidUser = (userInfo) => {
    try{
        return _.isString(userInfo.name) && userInfo.name.trim().length > 0;
    } catch(e){
        return false;
    }
};

exports.isValidCookie = (cookie) => {
    try{
        return _.isString(cookie.session);
    } catch(e){
        return false;
    }
};

exports.isPlayerInGame = (gameTable, player) => {
    try{
        return gameTable.players.find((actualPlayer) => {
            return actualPlayer.id == player.id;
        })
    } catch(e){
        return true;
    }
}