const _ = require('underscore');
const validator = require('../../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const eventEmitter = require('../../communication/eventEmitter');

const sendGameToPlayers = require('../sendGameToPlayers');
const getPlayerIndex = require('../../utils/getPlayerIndex');
const endFight = require('./endFight');
const nextPlayer = require('../nextPlayer');
const turnPhases = require('../turnPhases');
const logger = require('../../../../tools/logger');

module.exports = (req, res) => {
    try {
        let params = _.pick(req.params, 'gameId');
        if(!validator.isValidGameId(params.gameId)) return res.status(400).json({title: 'Invalid game id', body: 'This game id is not valid.'});

        GameModel.findById(params.gameId, (err, gameTable) => {
            if (err){
                throw err;
            }
            if (!gameTable) return res.status(404).json({title: 'Game not found', body: 'This game table was not created.'});
            if (!gameTable.active) return res.status(400).json({title: 'Game has not begun.', body: 'You can only ask for help when the game starts.'});
            if (!validator.isInterfereEnable(gameTable, req.userInfo.id)) return res.status(400).json({title: 'Intefere is not avaiable', 
                body: 'You can only intefer when the player is winning.'});
            
            gameTable.fight.finishedInterferes.push(req.userInfo.id);

            //  Check if everyone finished interfeering
            let isPlayerBeingHelped = gameTable.fight.helper.helperId == '' || !gameTable.fight.helper.helperId?0:1;

            if (gameTable.players.length <= gameTable.fight.finishedInterferes.length + isPlayerBeingHelped + 1){
                let playerIndex = getPlayerIndex(gameTable, gameTable.turnInfo.playerId);
                endFight(gameTable);
                nextPlayer(gameTable, playerIndex);
            }
            
            sendGameToPlayers(gameTable);

            return gameTable.save((err) => {
                if (err) {
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