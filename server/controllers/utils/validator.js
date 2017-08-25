const _ = require('underscore');
const mongoose = require('mongoose');
const logger = require('../../../tools/logger');
const turnPhases = require('../game/turnPhases');
const deckType = require('../game/deckType');
const treasureType = require('../game/treasure/treasuresType');
const equipmentsType = require('../game/treasure/equipmentsType');

//  TODO: This will be in player info database
const MAX_EQUIPMENT_AMOUNT = [
    1,
    1,
    2,
    1,
    1,
    1,
    1,
    1,
    1,
    Number.MAX_SAFE_INTEGER
];

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
        return !isNaN(amount) && amount.trim() != '' && amount >= 0;
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
        return gameInfo.fight.helper.helperId == helperInfo.id;
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
        return ((gameTable.turnInfo.playerId == playerId || gameTable.fight.helper.helperId == playerId) || gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_WINNING) && (gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_LOOSING || gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_WINNING);
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isHelpEnable = (gameTable, playerId) => {
    try {
        return gameTable.turnInfo.playerId == playerId && gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_LOOSING && (!gameTable.fight.helper.helperId || gameTable.fight.helper.helperId == '');
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isHelpAnswerEnable = (gameTable, playerId) => {
    try {
        return gameTable.fight.helper.helperId == playerId && gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_HELP_ANSWER;
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isInterfereEnable = (gameTable, playerId) => {
    try {
        let interfereFinished = gameTable.fight.finishedInterferes.findIndex((interfereId) => {
            return interfereId == playerId;
        });
        return gameTable.turnInfo.playerId != playerId && gameTable.fight.helper.helperId != playerId && interfereFinished == -1 && gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_WINNING;
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isEquipItemEnable = (gameTable, playerId) => {
    try {
        return true;
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isDiscardItemEnable = (gameTable, playerId) => {
    try {
        return true;
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

exports.isEquipment = (gameTable, playerIndex, itemIndex) => {
    try {
        return gameTable.players[playerIndex].hand[itemIndex].deck == deckType.TREASURE && gameTable.players[playerIndex].hand[itemIndex].cardType == treasureType.EQUIPMENT;
    } catch (err){
        logger.logError(err);
        return false;
    }
};

exports.isEquipmentSlotAvaiable = (gameTable, playerIndex, itemIndex) => {
    try {
        let itemEquipmentType = gameTable.players[playerIndex].hand[itemIndex].equipmentType;
        let equippedTypeAmount = 0;
        let twoHandAmount = 0;
        let isHandEquipType = itemEquipmentType == equipmentsType.ONE_HAND || itemEquipmentType == equipmentsType.TWO_HAND;
        gameTable.players[playerIndex].equipment.forEach((equipment) => {
            if (equipment.equipmentType == itemEquipmentType) {
                equippedTypeAmount++
            } else if (isHandEquipType && equipment.equipmentType == equipmentsType.TWO_HAND){
                twoHandAmount++;
            }
        });
        if (equippedTypeAmount >= MAX_EQUIPMENT_AMOUNT[equippedTypeAmount]){
            return false;
        }
        if (isHandEquipType){
            if (twoHandAmount > 0 && equippedTypeAmount == equipmentsType.TWO_HAND){
                return false;
            }
        }
        return true;

    } catch (err){
        logger.logError(err);
        return false;
    }
};
