const _ = require('underscore');
const mongoose = require('mongoose');
const logger = require('../../../tools/logger');
const turnPhases = require('../game/turnPhases');
const deckType = require('../game/deckType');
const treasureType = require('../game/treasure/treasuresType');

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
    try {
        return mongoose.Types.ObjectId.isValid(gameId);
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isValidPlayerId = (playerId) => {
    try{
        return _.isString(playerId) && playerId.trim().length > 0;
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isValidItemId = (itemId) => {
    try{
        return mongoose.Types.ObjectId.isValid(itemId);
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isOwner = (gameTable, playerId) => {
    try {
        return _.isString(playerId) && gameTable.ownerId == playerId;
    } catch (err){
        logger.logError(err);
        return false;
    }
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

exports.isPickDungeonEnable = (gameTable, playerId) => {
    try {
        return (gameTable.turnInfo.phase == turnPhases.DRAW_FIRST_DUNGEON || gameTable.turnInfo.phase == turnPhases.DRAW_SECOND_DUNGEON) && gameTable.turnInfo.playerId == playerId;
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isRunEnable = (gameTable, playerId) => {
    try {
        return gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_LOOSING && gameTable.turnInfo.playerId == playerId;
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isUseItemEnable = (gameTable, playerId) => {
    try {
        return ((gameTable.turnInfo.playerId == playerId || gameTable.turnInfo.helperId == playerId) || isInterfereEnable(gameTable, playerId)) && (gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_LOOSING || gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_WINNING);
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isHelpEnable = (gameTable, playerId) => {
    try {
        return gameTable.turnInfo.playerId == playerId && gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_LOOSING && (!gameTable.turnInfo.helperId || gameTable.turnInfo.helperId == '');
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isHelpAnswerEnable = (gameTable, playerId) => {
    try {
        return gameTable.turnInfo.helperId == playerId && gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_HELP_ANSWER;
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isInterfereEnable = (gameTable, playerId) => {
    try {
        return gameTable.turnInfo.playerId != playerId && gameTable.turnInfo.helper != helperId && turnPhase == turnPhases.FIGHT_MONSTER_WINNING;
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isItemToFight = (gameTable, playerIndex, itemIndex) => {
    try {
        return gameTable.players[playerIndex].hand[itemIndex].deck == deckType.TREASURE && gameTable.players[playerIndex].hand[itemIndex].cardType == treasureType.CONSUMABLE;
    } catch (err){
        logger.logError(err);
        return false;
    }
};