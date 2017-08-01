const _ = require('underscore');
const validator = require('../../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const eventEmitter = require('../../communication/eventEmitter');
const sendGameToPlayers = require('../sendGameToPlayers');

const getPlayerIndex = require('../../utils/getPlayerIndex');
const getHandItemIndex = require('../../utils/getHandItemIndex');
const discardTreasure = require('../treasure/discardTreasure');
const calculateFightResult = require('./calculateFightResult');
const turnPhases = require('../turnPhases');
const logger = require('../../../../tools/logger');

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
            if (!gameTable.active) return res.status(400).json({title: 'Game has not begun.', body: 'You can only use items when the game starts.'});
            if (!validator.isPlayerTurn(gameTable, req.userInfo) && !validator.isHelperTurn(gameTable, req.userInfo)) return res.status(400).json({title: 'It`s not your turn', 
                body: 'You can only use items when it`s your turn.'});
            if (!validator.isUseItemEnable(gameTable.turnInfo.phase)) return res.status(400).json({title: 'You cannot use items now', 
                body: 'You can only run when it`s your turn and you are loosing a fight.'});

            let playerIndex = getPlayerIndex(gameTable, req.userInfo);
            let itemIndex = getHandItemIndex(gameTable, playerIndex, body.itemId);

            if (itemIndex == -1) return res.status(400).json({title: 'You cannot use this item', body: 'You don`t have this item in your hand.'});
            if (!validator.isItemToFight(gameTable, playerIndex, itemIndex)) return res.status(400).json({title: 'You cannot use this item', 
                body: 'This item is not usable in a fight.'});
            
            //  Add bonus to fight and recalculate fight
            gameTable.fight.player.powerBonus += gameTable.players[playerIndex].hand[itemIndex].bonus;
            eventEmitter.sendChatMessage(gameTable._id, gameTable.players[playerIndex].name + ' used ' +  gameTable.players[playerIndex].hand[itemIndex].name + ' and added '
                + gameTable.players[playerIndex].hand[itemIndex].bonus + ' to his/her combat power on this fight.');

            discardTreasure(gameTable, gameTable.players[playerIndex].hand.splice(itemIndex, 1));
            gameTable.players[playerIndex].cardsOnHand--;
            //  TODO: Add card to fight
            calculateFightResult(gameTable);
            let playerPower = gameTable.fight.player.combatPower + gameTable.fight.player.powerBonus;
            let monsterPower = gameTable.fight.monster[0].combatPower + gameTable.fight.monster[0].powerBonus;


            if (gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_LOOSING) {
                eventEmitter.sendChatMessage(gameTable.id, gameTable.turnInfo.playerName + ' is still loosing this fight. The total is Player:' + playerPower + ' X Monsters:' + monsterPower);
                //  Enable Run, Item and Help commands
            } else {
                eventEmitter.sendChatMessage(gameTable.id, gameTable.turnInfo.playerName + ' is now able to defeat the monster. Will anyone interfere? The total is Player:' + playerPower + ' X Monsters:' + monsterPower);
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