const _ = require('underscore');
const validator = require('../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const eventEmitter = require('../communication/eventEmitter');
const sendGameToPlayers = require('./sendGameToPlayers');

const getPlayerIndex = require('../utils/getPlayerIndex');
const getHandItemIndex = require('../utils/getHandItemIndex');
const getEquipmentItemIndex = require('../utils/getEquipmentItemIndex');
const updatePlayerInfo = require('../player/updatePlayerInfo');
const discardTreasure = require('./treasure/discardTreasure');
const nextPlayer = require('./nextPlayer');
const turnPhases = require('./turnPhases');
const logger = require('../../../tools/logger');

const HAND_LIMIT = 5;

module.exports = (req, res) => {
    try {
        let params = _.pick(req.params, 'gameId');
        let body = _.pick(req.body, 'itemId');
        if(!validator.isValidGameId(params.gameId)) return res.status(400).json({title: 'Invalid game', body: 'This game id is not valid.'});
        if(!validator.isValidItemId(body.itemId)) return res.status(400).json({title: 'Invalid item', body: 'This item id is not valid.'});

        GameModel.findById(params.gameId, (err, gameTable) => {
            if (err){
                throw err;
            }
            if (!gameTable) return res.status(404).json({title: 'Game not found', body: 'This game table was not created.'});
            if (!gameTable.active) return res.status(400).json({title: 'Game has not begun.', body: 'You can only use discard items when the game starts.'});
            if (!validator.isDiscardItemEnable(gameTable, req.userInfo.id)) return res.status(400).json({title: 'You cannot discard items now', 
                body: 'You can only discard items when it`s your turn.'});

            let playerIndex = getPlayerIndex(gameTable, req.userInfo.id);
            let handIndex = getHandItemIndex(gameTable, playerIndex, body.itemId);
            let equipmentIndex = getEquipmentItemIndex(gameTable, playerIndex, body.itemId);

            if (handIndex == -1 && equipmentIndex == -1) return res.status(400).json({title: 'You cannot discard this item', body: 'You don`t have this item in your hand or equipments.'});
            if (handIndex != -1){
                eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' discarded ' + gameTable.players[playerIndex].hand[handIndex].name + ' from hand.');
                discardTreasure(gameTable, gameTable.players[playerIndex].hand.splice(handIndex, 1));     
            } else {
                updatePlayerInfo(gameTable, playerIndex, equipmentIndex, false);
                eventEmitter.sendChatMessage(gameTable.id, gameTable.players[playerIndex].name + ' discarded ' + gameTable.players[playerIndex].equipment[equipmentIndex].name + ' from equipments.');
                discardTreasure(gameTable,gameTable.players[playerIndex].equipment.splice(equipmentIndex, 1));
            }
            gameTable.players[playerIndex].cardsOnHand--;

            if (gameTable.turnInfo.phase == turnPhases.DISCARD_CARDS && gameTable.players[playerIndex].cardsOnHand <= HAND_LIMIT){
                nextPlayer(gameTable, playerIndex);
            }

            sendGameToPlayers(gameTable);

            return gameTable.save((err) => {
                if (err) {
                    throw err;
                } 
                return res.status(200).json({msg: 'Item used.'});
            });
            
        });    
    } catch(err){
        res.status(500).json({title: 'Server error', body: 'Something happened and even we don`t know what it is.'});
        console.log(err);
        return logger.logError(err);
    }
};