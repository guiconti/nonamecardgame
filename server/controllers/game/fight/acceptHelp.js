const _ = require('underscore');
const validator = require('../../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const eventEmitter = require('../../communication/eventEmitter');

const getPlayerIndex = require('../../utils/getPlayerIndex');
const sendGameToPlayers = require('../sendGameToPlayers');
const turnPhases = require('../turnPhases');
const logger = require('../../../../tools/logger');

module.exports = (req, res) => {
    try {
        let params = _.pick(req.params, 'gameId');
        if(!validator.isValidGameId(params.gameId)) return res.status(400).json({msg: 'Invalid game id'});
        params.gameId = params.gameId.trim();

        GameModel.findById(params.gameId, (err, gameTable) => {
            if (err){
                res.status(500).json({msg: 'We could not find you game due to DB issues. Try again.'});
                throw err;
            }
            if (!gameTable) return res.status(404).json({msg: 'Game table not found.'});
            if (!gameTable.active) return res.status(400).json({msg: 'Game has not begun.'});
            if (!validator.isHelperTurn(gameTable, req.userInfo)) return res.status(400).json({msg: 'It`s not your turn.'});
            if (!validator.isHelpAnswerEnable(gameTable.turnInfo.phase)) return res.status(400).json({msg: 'You cannot accept a help now.'});

            let playerInfo = {
                id: gameTable.turnInfo.playerId
            };

            let playerIndex = getPlayerIndex(gameTable, playerInfo);
            let helperIndex = getPlayerIndex(gameTable, req.userInfo);

            console.log(playerIndex);

            if (gameTable.players[playerIndex].combatPower + gameTable.players[helperIndex].combatPower <= gameTable.table.monster[0].stats.combatPower){
                gameTable.turnInfo.phase = turnPhases.FIGHT_MONSTER_LOOSING;
                eventEmitter.sendChatMessage(gameTable.id, gameTable.players[helperIndex].name + ' is helping ' + gameTable.players[playerIndex].name
                    + ' on the fight. But it is still not enough to defeat the monster.');
            } else {
                gameTable.turnInfo.phase = turnPhases.FIGHT_MONSTER_WINNING;
                eventEmitter.sendChatMessage(gameTable.id, gameTable.players[helperIndex].name + ' is helping ' + gameTable.players[playerIndex].name
                    + ' on the fight. Together they are winning the fight.');
            }
            sendGameToPlayers(gameTable);

            //  TODO: Add helper name

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