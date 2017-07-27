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
            treasureAmount: body.treasureAmount,
        };

        GameModel.findById(params.gameId, (err, gameTable) => {
            if (err){
                res.status(500).json({msg: 'We could not find you game due to DB issues. Try again.'});
                throw err;
            }
            if (!gameTable) return res.status(404).json({msg: 'Game table not found.'});
            if (!gameTable.active) return res.status(400).json({msg: 'Game has not begun.'});
            if (!validator.isPlayerTurn(gameTable, req.userInfo)) return res.status(400).json({msg: 'It`s not your turn.'});
            if (!validator.isHelpEnable(gameTable)) return res.status(400).json({msg: 'You cant ask for help now.'});

            let playerIndex = getPlayerIndex(gameTable, req.userInfo);
            let helperIndex = getPlayerIndex(gameTable, helperInfo);

            if (helperIndex === -1 || helperIndex == playerIndex) return res.status(400).json({msg: 'Helper does not exist in this game.'});
            if (gameTable.table.monster[0].stats.treasureReward < helperInfo.treasureAmount) return res.status(400).json({
                msg: 'Helper reward bigger than the monster reward'
            });
            gameTable.turnInfo.phase = turnPhases.FIGHT_MONSTER_HELP_ANSWER;
            gameTable.turnInfo.helperId = helperInfo.id;
            gameTable.turnInfo.helperName = gameTable.players[helperIndex].name;
            //  TODO: Add helper name

            let askInfo = {
                type: 0,
                title: gameTable.turnInfo.playerName + ' is asking for your help',
                body: gameTable.turnInfo.playerName + ' is asking for you to fight with him against ' + gameTable.table.monster[0].name + ' for ' + helperInfo.treasureAmount + ' treasure(s).',
                requester: gameTable.turnInfo.playerName,
                treasureAmount: helperInfo.treasureAmount,
                acceptSuffix: '/fight/ask_help/accept',
                refuseSuffix: '/fight/ask_help/refuse'
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