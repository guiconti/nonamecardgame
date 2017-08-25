const _ = require('underscore');
const validator = require('../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const eventEmitter = require('../communication/eventEmitter');
const messagesType = require('../communication/messagesType');
const sendGameToPlayers = require('./sendGameToPlayers');

const getPlayerIndex = require('../utils/getPlayerIndex');
const getHandItemIndex = require('../utils/getHandItemIndex');
const updatePlayerInfo = require('../player/updatePlayerInfo');
const nextPlayer = require('./nextPlayer');
const calculateFightResult = require('./fight/calculateFightResult');
const turnPhases = require('./turnPhases');
const logger = require('../../../tools/logger');

const HAND_LIMIT = 5;

module.exports = (req, res) => {
    try {
        let params = _.pick(req.params, 'gameId');
        let body = _.pick(req.body, 'equipmentId');
        if(!validator.isValidGameId(params.gameId)) return res.status(400).json({title: 'Invalid game', body: 'This game id is not valid.'});
        if(!validator.isValidItemId(body.equipmentId)) return res.status(400).json({title: 'Invalid equipment', body: 'This equipment id is not valid.'});

        GameModel.findById(params.gameId, (err, gameTable) => {
            if (err){
                throw err;
            }
            if (!gameTable) return res.status(404).json({title: 'Game not found', body: 'This game table was not created.'});
            if (!gameTable.active) return res.status(400).json({title: 'Game has not begun.', body: 'You can only use items when the game starts.'});
            if (!validator.isEquipItemEnable(gameTable, req.userInfo.id)) return res.status(400).json({title: 'You cannot equip items now', 
                body: 'You can only equip items when it`s your turn.'});

            let playerIndex = getPlayerIndex(gameTable, req.userInfo.id);
            let equipmentIndex = getHandItemIndex(gameTable, playerIndex, body.equipmentId);

            if (equipmentIndex == -1) return res.status(400).json({title: 'You cannot use this equipment', body: 'You don`t have this equipment in your hand.'});
            if (!validator.isEquipment(gameTable, playerIndex, equipmentIndex)) return res.status(400).json({title: 'You cannot use this item', 
                body: 'This item is not equipable.'});
            if (!validator.isEquipmentSlotAvaiable(gameTable, playerIndex, equipmentIndex)) return res.status(400).json({title: 'You cannot equip this item', 
                body: 'You already have the maximum allowed amount of this type of equipment equipped.'});

            updatePlayerInfo(gameTable, playerIndex, equipmentIndex, true);
            gameTable.players[playerIndex].equipment.push(gameTable.players[playerIndex].hand.splice(equipmentIndex, 1)[0]);
            gameTable.players[playerIndex].cardsOnHand--;
            
            //  Update if fight is going on
            if (gameTable.fight.monster.length > 0 && (gameTable.players[playerIndex].id == gameTable.turnInfo.playerId || gameTable.players[playerIndex].id == gameTable.fight.helper.helperId)){
                gameTable.fight.player.combatPower += gameTable.players[playerIndex].hand[equipmentIndex].bonus;
                calculateFightResult(gameTable);
                if (gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_WINNING){
                    let playerPower = gameTable.fight.player.combatPower + gameTable.fight.player.powerBonus;
                    let monsterPower = gameTable.fight.monster[0].combatPower + gameTable.fight.monster[0].powerBonus;
                    gameTable.fight.finishedInterferes = [];
                    let message = {
                        type: messagesType.MONSTER,
                        text: gameTable.turnInfo.playerName + ' is able to defeat the monster. Will anyone interfere? The total is Player:' + playerPower + ' X Monsters:' + monsterPower
                    };
                    eventEmitter.sendChatMessage(gameTable.id, message);
                    gameTable.chatHistory.unshift(message);
                }
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