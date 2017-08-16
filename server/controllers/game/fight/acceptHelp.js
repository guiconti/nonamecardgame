const _ = require('underscore');
const validator = require('../../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const eventEmitter = require('../../communication/eventEmitter');
const messagesType = require('../../communication/messagesType');

const getPlayerIndex = require('../../utils/getPlayerIndex');
const sendGameToPlayers = require('../sendGameToPlayers');
const calculateFightResult = require('./calculateFightResult');
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
            if (!validator.isHelpAnswerEnable(gameTable, req.userInfo.id)) return res.status(400).json({title: 'It`s not your turn', 
                body: 'You can only accept for help when someone asks you.'});

            let playerIndex = getPlayerIndex(gameTable, gameTable.turnInfo.playerId);
            let helperIndex = getPlayerIndex(gameTable, req.userInfo.id);
            
            //  Update combat power
            gameTable.fight.player.combatPower += gameTable.players[helperIndex].combatPower;
            calculateFightResult(gameTable);
            let message = {
                type: messagesType.MONSTER,
                text: ''
            };
            if (gameTable.turnInfo.phase == turnPhases.FIGHT_MONSTER_LOOSING){
                message.text = gameTable.players[helperIndex].name + ' is helping ' + gameTable.players[playerIndex].name
                    + ' on the fight. But it is still not enough to defeat the monster.';
                eventEmitter.sendChatMessage(gameTable.id, message);
                gameTable.chatHistory.unshift(message);
            } else {
                gameTable.fight.finishedInterferes = [];
                message.text = gameTable.players[helperIndex].name + ' is helping ' + gameTable.players[playerIndex].name
                    + ' on the fight. Together they are winning the fight.';
                eventEmitter.sendChatMessage(gameTable.id, message);
                gameTable.chatHistory.unshift(message);
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