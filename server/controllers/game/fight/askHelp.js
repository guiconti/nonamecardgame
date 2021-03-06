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
        if(!validator.isValidGameId(params.gameId)) return res.status(400).json({title: 'Invalid game id', body: 'This game id is not valid.'});
        if(!validator.isValidPlayerId(body.helperId)) return res.status(400).json({title: 'Invalid helper', body: 'The helper you selected does not exists.'});
        if(!validator.isValidAmount(body.treasureAmount)) return res.status(400).json({title: 'Invalid treasure amount',
             body: 'The treasure amount must be between 0 and the number of treasures given by the monster.'});
        let helperInfo = {
            id: body.helperId.trim(),
            treasureAmount: body.treasureAmount,
        };

        GameModel.findById(params.gameId, (err, gameTable) => {
            if (err){
                throw err;
            }
            if (!gameTable) return res.status(404).json({title: 'Game not found', body: 'This game table was not created.'});
            if (!gameTable.active) return res.status(400).json({title: 'Game has not begun.', body: 'You can only ask for help when the game starts.'});
            if (!validator.isHelpEnable(gameTable, req.userInfo.id)) return res.status(400).json({title: 'You cant ask for help now.',
                 body: 'You can only ask for help when you are in a loosing fight without help.'});

            let playerIndex = getPlayerIndex(gameTable, req.userInfo.id);
            let helperIndex = getPlayerIndex(gameTable, helperInfo.id);

            if (helperIndex === -1 || helperIndex == playerIndex) return res.status(400).json({title: 'Helper not found', 
                body: 'The helper you select does not exist in this game.'});
            if (gameTable.fight.monster[0].treasureReward < helperInfo.treasureAmount) return res.status(400).json({title: 'Invalid treasure amount',
                body: 'The treasure amount must be between 0 and the number of treasures given by the monster.'});
            gameTable.turnInfo.phase = turnPhases.FIGHT_MONSTER_HELP_ANSWER;
            gameTable.fight.helper.helperId = helperInfo.id;
            gameTable.fight.helper.helperName = gameTable.players[helperIndex].name;
            gameTable.fight.helper.helperTreasures = body.treasureAmount;
            //  TODO: Add helper name

            let askInfo = {
                type: 0,
                title: gameTable.turnInfo.playerName + ' is asking for your help',
                body: gameTable.turnInfo.playerName + ' is asking for you to fight with him against ' + gameTable.fight.monster[0].name + ' for ' + helperInfo.treasureAmount + ' treasure(s).',
                requester: gameTable.turnInfo.playerName,
                treasureAmount: helperInfo.treasureAmount,
                acceptSuffix: '/fight/ask_help/accept',
                refuseSuffix: '/fight/ask_help/refuse'
            };
            gameTable.turnInfo.pendingAnswer.playerId = gameTable.players[helperIndex].id;
            //gameTable.turnInfo.pendingAnswer.question = _.clone(askInfo);
            gameTable.turnInfo.pendingAnswer.question = {
                type: askInfo.type,
                title: askInfo.title,
                body: askInfo.body,
                requester: askInfo.requester,
                treasureAmount: askInfo.treasureAmount,
                acceptSuffix: askInfo.acceptSuffix,
                refuseSuffix: askInfo.refuseSuffix
            }
            eventEmitter.askPlayer(gameTable._id, gameTable.players[helperIndex].communicationId, JSON.stringify(askInfo));
            
            return gameTable.save((err) => {
                if (err) {
                    console.log(err);
                    throw err;
                } 
                return res.status(200).json({msg: 'Help asked.'});
            });
            
        });    
    } catch(err){
        res.status(500).json({title: 'Server error', body: 'Something happened and even we don`t know what it is.'});
        console.log(err);
        return logger.logError(err);
    }
};