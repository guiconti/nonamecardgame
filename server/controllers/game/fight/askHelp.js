const _ = require('underscore');
const validator = require('../../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const eventEmitter = require('../../communication/eventEmitter');

const getPlayerIndex = require('../../utils/getPlayerIndex');
const turnPhases = require('../turnPhases');
const logger = require('../../../../tools/logger');

module.exports = (req, res) => {
    try {
        let params = _.pick(req.params, 'gameId');
        let body = _.pick(req.body, 'helperId', 'treasureAmount');
        if(!validator.isValidGameId(params.gameId)) return res.status(400).json({msg: 'Invalid game id'});
        if(!validator.isValidPlayerId(body.helperId)) return res.status(400).json({msg: 'Invalid helper id'});
        if(!validator.isValidAmount(body.treasureAmount)) return res.status(400).json({msg: 'Invalid treasure amount'});
        params.gameId = params.gameId.trim();
        let helperInfo = {
            id: body.helperId.trim(),
            treasureAmount: body.treasureAmount
        }

        GameModel.findById(params.gameId, (err, gameTable) => {
            if (err){
                res.status(500).json({msg: 'We could not find you game due to DB issues. Try again.'});
                throw err;
            }
            if (!gameTable) return res.status(404).json({msg: 'Game table not found.'});
            if (!gameTable.active) return res.status(400).json({msg: 'Game has not begun.'});
            if (!validator.isPlayerTurn(gameTable, req.userInfo)) return res.status(400).json({msg: 'It`s not your turn.'});
            if (!validator.isHelpEnable(gameTable.turnInfo.phase)) return res.status(400).json({msg: 'You cant ask for help now.'});

            let playerIndex = getPlayerIndex(gameTable, req.userInfo);
            let helperIndex = getPlayerIndex(gameTable, helperInfo);

            if (helperIndex === -1 || helperIndex == playerIndex) return res.status(400).json({msg: 'Helper does not exist in this game.'});
            gameTable.turnInfo.phase = turnPhases.FIGHT_MONSTER_HELP_RESPONSE;
            gameTable.turnInfo.helperId = helperInfo.id;
            //  TODO: Add helper name

            let askInfo = {
                type: 0,
                requester: gameTable.players[playerIndex].name,
                treasureAmount: helperInfo.treasureAmount
            };
            eventEmitter.askPlayer(gameTable._id, gameTable.players[helperIndex].communicationId, JSON.stringify(askInfo));

            return gameTable.save((err) => {
                if (err) {
                    res.status(500).json({msg: 'We could not save due to DB issues. Try again.'});
                    throw err;
                } 
                return res.status(200).json({msg: 'Help asked.'});
            });
            
        });    
    } catch(err){
        console.log(err);
        return logger.logError(err);
    }
};