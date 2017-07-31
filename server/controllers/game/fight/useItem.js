const _ = require('underscore');
const validator = require('../../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const eventEmitter = require('../../communication/eventEmitter');
const sendGameToPlayers = require('../sendGameToPlayers');

const getPlayerIndex = require('../../utils/getPlayerIndex');
const getHandItemIndex = require('../../utils/getHandItemIndex');
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
            if (!gameTable.active) return res.status(400).json({title: 'Game has not begun.', body: 'You can only ask for help when the game starts.'});
            if (!validator.isPlayerTurn(gameTable, req.userInfo)) return res.status(400).json({title: 'It`s not your turn', 
                body: 'You can only ask for help when it is your turn.'});
            if (!validator.isUseItemEnable(gameTable.turnInfo.phase)) return res.status(400).json({title: 'You cannot use items now', 
                body: 'You can only run when it`s your turn and you are loosing a fight.'});

            let playerIndex = getPlayerIndex(gameTable, req.userInfo);
            let itemIndex = getHandItemIndex(gameTable, playerIndex, body.itemId);

            if (itemIndex == -1) return res.status(400).json({title: 'You cannot use this item', body: 'You don`t have this item in your hand.'});
            if (!validator.isItemToFight(gameTable, playerIndex, itemIndex)) return res.status(400).json({title: 'You cannot use this item', 
                body: 'This item is not usable in a fight.'});
            
            //  Add bonus to fight and recalculate fight
            gameTable.fight.player.powerBonus += gameTable.players[playerIndex].hand[itemIndex].bonus;
            //  TODO: Calculate the fight again

            sendGameToPlayers(gameTable);

            return gameTable.save((err) => {
                if (err) {
                    throw err;
                } 
                return res.status(200).json({msg: 'Player ran.'});
            });
            
        });    
    } catch(err){
        res.status(500).json({title: 'Server error', body: 'Something happened and even we don`t know what it is.'});
        console.log(err);
        return logger.logError(err);
    }
};