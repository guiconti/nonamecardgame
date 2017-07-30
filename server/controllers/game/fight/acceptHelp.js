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
        if(!validator.isValidGameId(params.gameId)) return res.status(400).json({title: 'Invalid game id', body: 'This game id is not valid.'});

        GameModel.findById(params.gameId, (err, gameTable) => {
            if (err){
                throw err;
            }
            if (!gameTable) return res.status(404).json({title: 'Game not found', body: 'This game table was not created.'});
            if (!gameTable.active) return res.status(400).json({title: 'Game has not begun.', body: 'You can only ask for help when the game starts.'});
            if (!validator.isHelperTurn(gameTable, req.userInfo)) return res.status(400).json({title: 'It`s not your turn', 
                body: 'You can only accept for help when someone asks you.'});
            if (!validator.isHelpAnswerEnable(gameTable.turnInfo.phase)) return res.status(400).json({title: 'It`s not your turn', 
                body: 'You can only accept for help when someone asks you.'});

            let playerInfo = {
                id: gameTable.turnInfo.playerId
            };

            let playerIndex = getPlayerIndex(gameTable, playerInfo);
            let helperIndex = getPlayerIndex(gameTable, req.userInfo);

            if (gameTable.players[playerIndex].combatPower + gameTable.players[helperIndex].combatPower <= gameTable.fight.monster[0].combatPower){
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