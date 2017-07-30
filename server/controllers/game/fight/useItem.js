const _ = require('underscore');
const validator = require('../../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const eventEmitter = require('../../communication/eventEmitter');
const sendGameToPlayers = require('../sendGameToPlayers');

const getPlayerIndex = require('../../utils/getPlayerIndex');
const turnPhases = require('../turnPhases');
const logger = require('../../../../tools/logger');

module.exports = (req, res) => {
    try {
        let params = _.pick(req.params, 'gameId');
        if(!validator.isValidGameId(params.gameId)) return res.status(400).json({title: 'Invalid game id', body: 'This game id is not valid.'});
        params.gameId = params.gameId.trim();

        GameModel.findById(params.gameId, (err, gameTable) => {
            if (err){
                throw err;
            }
            if (!gameTable) return res.status(404).json({title: 'Game not found', body: 'This game table was not created.'});
            if (!gameTable.active) return res.status(400).json({title: 'Game has not begun.', body: 'You can only ask for help when the game starts.'});
            if (!validator.isPlayerTurn(gameTable, req.userInfo)) return res.status(400).json({title: 'It`s not your turn', 
                body: 'You can only ask for help when it is your turn.'});
            if (!validator.isRunEnable(gameTable.turnInfo.phase)) return res.status(400).json({title: 'You cannot run now', 
                body: 'You can only run when it`s your turn and you are loosing a fight.'});

            let playerIndex = getPlayerIndex(gameTable, req.userInfo);
            let diceResult = throwDice(DICE_SIZES);

            eventEmitter.sendChatMessage(gameTable._id, gameTable.players[playerIndex].name + ' decided to run.');
            if (diceResult >= MIN_TO_RUN){
                eventEmitter.sendChatMessage(gameTable._id, gameTable.players[playerIndex].name + ' got ' + diceResult
                + ' on the dice and manages to run. He manage to run from the monster without consequences.');
            } else {
                eventEmitter.sendChatMessage(gameTable._id, gameTable.players[playerIndex].name + ' got ' + diceResult
                + ' on the dice and it`s not enough to run! He suffers the consequences from loosing to the monster.');
            }

            // End fight and change player to next
            removeMonster(gameTable);
            nextPlayer(gameTable, playerIndex);
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