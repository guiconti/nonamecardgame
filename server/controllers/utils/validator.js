const _ = require('underscore');
const logger = require('../../../tools/logger');
const turnPhases = require('../game/turnPhases');

exports.isValidGame = (gameInfo) => {
    try{
        return (_.isString(gameInfo.name) && gameInfo.name.trim().length > 0) && 
            (_.isUndefined(gameInfo.password) || (_.isString(gameInfo.assword) && gameInfo.password.trim().length > 0));
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isValidGameId = (gameId) => {
    return _.isString(gameId) && gameId.trim().length > 0;
};

exports.isValidPlayerId = (playerId) => {
    return _.isString(playerId) && playerId.trim().length > 0;
};

exports.isValidPlayer = (playerInfo) => {
    try{
        return _.isString(playerInfo.name) && playerInfo.name.trim().length > 0;
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isValidUser = (userInfo) => {
    try{
        return _.isString(userInfo.name) && userInfo.name.trim().length > 0;
    } catch(err){
        logger.logError(err);
        return false;
    }
};

exports.isValidCookie = (cookie) => {
    try{
        return _.isString(cookie.session);
    } catch(err){
        logger.logError(err);
        return false;
    }
};

exports.isValidAmount = (amount) => {
    try{
        return amount > 0;
    } catch(err){
        logger.logError(err);
        return false;
    }
};

exports.isPlayerTurn = (gameInfo, playerInfo) => {
    try{
        return gameInfo.turnInfo.playerId == playerInfo.id;
    } catch(err){
        logger.logError(err);
        return false;
    }
};

exports.isHelperTurn = (gameInfo, helperInfo) => {
    try{
        return gameInfo.turnInfo.helperId == helperInfo.id;
    } catch(err){
        logger.logError(err);
        return false;
    }
};

exports.isActualPhase = (gameInfo, validPhases) => {
    try{
        return validPhases.includes(gameInfo.turnInfo.phase);
    } catch(err){
        logger.logError(err);
        return false;
    }
};

exports.isPickDungeonPhase = (turnPhase) => {
    try {
        return turnPhase == turnPhases.DRAW_FIRST_DUNGEON || turnPhase == turnPhases.DRAW_SECOND_DUNGEON;
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isRunEnable = (turnPhase) => {
    try {
        return turnPhase == turnPhases.FIGHT_MONSTER_LOOSING;
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isUseItemEnable = (turnPhase) => {
    try {
        return turnPhase == turnPhases.FIGHT_MONSTER_LOOSING;
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isHelpEnable = (gameTable) => {
    try {
        return gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_LOOSING && (!gameTable.turnInfo.helperId || gameTable.turnInfo.helperId == '');
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isHelpAnswerEnable = (turnPhase) => {
    try {
        return turnPhase == turnPhases.FIGHT_MONSTER_HELP_ANSWER;
    } catch (err){
        logger.logError(err);
        return false;
    }
};