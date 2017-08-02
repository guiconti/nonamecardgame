const _ = require('underscore');
const validator = require('../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');

const getPlayerIndex = require('../utils/getPlayerIndex');
const getDungeon = require('./dungeon/getDungeon');
const pickDungeonAction = require('./dungeon/pickDungeonAction');
const logger = require('../../../tools/logger');

module.exports = (req, res) => {

    try {
        let params = _.pick(req.params, 'gameId');
        if(!validator.isValidGameId(params.gameId)) return res.status(400).json({title: 'Invalid game id', body: 'This game id is not valid.'});

        GameModel.findById(params.gameId, (err, gameTable) => {
            if (err){
                throw err;
            }
            if (!gameTable) return res.status(404).json({title: 'Game not found', body: 'This game table was not created.'});
            if (!gameTable.active) return res.status(400).json({title: 'Game has not begun.', body: 'You can only pick dungeons when the game starts.'});
            if (!validator.isPickDungeonEnable(gameTable, req.userInfo.id)) return res.status(400).json({title: 'You can`t pick dungeon now', 
                body: 'You can only pick dungeons when it is on dungeon draw phase.'});

            let playerIndex = getPlayerIndex(gameTable, req.userInfo);
            let dungeonPicked = getDungeon(gameTable);
            pickDungeonAction(gameTable, playerIndex, dungeonPicked);   
            return gameTable.save((err) => {
                if (err) {
                    throw err;
                } 
                return res.status(200).json({msg: 'Dungeon picked.', type: dungeonPicked.cardType});
            });
            
        });    
    } catch(err){
        res.status(500).json({title: 'Server error', body: 'Something happened and even we don`t know what it is.'});
        console.log(err);
        return logger.logError(err);
    }
};
