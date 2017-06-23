const _ = require('underscore');
const validator = require('../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');

const eventEmitter = require('../communication/eventEmitter');
const getPlayerIndex = require('../utils/getPlayerIndex');
const getDungeon = require('./dungeon/getDungeon');
const turnPhases = require('./turnPhases');
const logger = require('../../../tools/logger');
const ACTUAL_PHASE = turnPhases.DRAW_DUNGEON;

module.exports = (req, res) => {

    try {
        let params = _.pick(req.params, 'gameId');
        if(!validator.isValidGameId) return res.status(400).json({msg: 'Invalid game id'});
        params.gameId = params.gameId.trim();

        GameModel.findById(params.gameId, (err, gameTable) => {
            if (err){
                res.status(500).json({msg: 'We could not find you game due to DB issues. Try again.'});
                throw err;
            }
            if (!gameTable) return res.status(404).json({msg: 'Game table not found.'});
            if (!gameTable.active) return res.status(400).json({msg: 'Game has not begun.'});
            if (!validator.isPlayerTurn(gameTable, req.userInfo)) return res.status(400).json({msg: 'It`s not your turn.'});
            if (!validator.isActualPhase(gameTable, ACTUAL_PHASE)) return res.tatus(400).json({msg: 'You cant pick up a dungeon now.'});

            let playerIndex = getPlayerIndex(gameTable, req.userInfo);
            let dungeonPicked = getDungeon(gameTable);
            gameTable.players[playerIndex].hand.push(dungeonPicked);

            gameTable.save((err) => {
                if (err) {
                    res.status(500).json({msg: 'We could not save the game due to DB issues. Try again.'});
                    throw err;
                }
                eventEmitter.sendChatMessage(params.gameId, gameTable.players[playerIndex].name + ' picked a dungeon.');
                return res.status(200).json({msg: 'Dungeon picked'});
            })
        });    
    } catch(err){
        console.log(err);
        return logger.logError(err);
    }
};
