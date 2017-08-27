const _ = require('underscore');
const validator = require('../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const messagesType = require('../communication/messagesType');
const eventEmitter = require('../communication/eventEmitter');
const sendGameToPlayers = require('./sendGameToPlayers');

const getPlayerIndex = require('../utils/getPlayerIndex');
const getHandItemIndex = require('../utils/getHandItemIndex');
const getEquipmentItemIndex = require('../utils/getEquipmentItemIndex');
const updatePlayerInfo = require('../player/updatePlayerInfo');
const deckType = require('./deckType');
const discardDungeon = require('./dungeon/discardDungeon');
const discardTreasure = require('./treasure/discardTreasure');
const calculateFightResult = require('./fight/calculateFightResult');
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
            let discardedCard = gameTable.players[playerIndex].hand[handIndex];

            if (handIndex == -1 && equipmentIndex == -1) return res.status(400).json({title: 'You cannot discard this item', body: 'You don`t have this item in your hand or equipments.'});
            if (handIndex != -1){
                let message = {
                    type: messagesType.INFO,
                    text: gameTable.players[playerIndex].name + ' discarded ' + discardedCard.name + ' from hand.'
                };
                eventEmitter.sendChatMessage(gameTable.id, message);
                gameTable.chatHistory.unshift(message);
                if (discardedCard.deck == deckType.TREASURE){
                    discardTreasure(gameTable, gameTable.players[playerIndex].hand.splice(handIndex, 1)); 
                }
                if (discardedCard.deck == deckType.DUNGEON){
                    discardDungeon(gameTable, gameTable.players[playerIndex].hand.splice(handIndex, 1)); 
                }           
                gameTable.players[playerIndex].cardsOnHand--; 
            } else {
                updatePlayerInfo(gameTable, playerIndex, equipmentIndex, false);
                let message = {
                    type: messagesType.INFO,
                    text: gameTable.players[playerIndex].name + ' discarded ' + gameTable.players[playerIndex].equipment[equipmentIndex].name + ' from equipments.'
                };
                eventEmitter.sendChatMessage(gameTable.id, message);
                gameTable.chatHistory.unshift(message);
                if (gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_WINNING) {
                    calculateFightResult(gameTable);
                    if (gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_LOOSING) {
                        let playerPower = gameTable.fight.player.combatPower + gameTable.fight.player.powerBonus;
                        let monsterPower = gameTable.fight.monster[0].combatPower + gameTable.fight.monster[0].powerBonus;
                        message.type = messagesType.MONSTER
                        message.text = gameTable.turnInfo.playerName + ' is now loosing this fight. The total is Player:' + playerPower + ' X Monsters:' + monsterPower;
                        eventEmitter.sendChatMessage(gameTable.id, message);
                        gameTable.chatHistory.unshift(message);
                    }
                }
                discardTreasure(gameTable,gameTable.players[playerIndex].equipment.splice(equipmentIndex, 1));
            }

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