const _ = require('underscore');
const validator = require('../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const eventEmitter = require('../communication/eventEmitter');
const logger = require('../../../tools/logger');

const sendGameToPlayers = require('./sendGameToPlayers');
const getTreasure = require('./treasure/getTreasure');
const getDungeon = require('./dungeon/getDungeon');
const treasuresList = require('./treasure/treasuresList');
const dungeonsList = require('./dungeon/dungeonsList');
const turnPhases = require('./turnPhases');
const nextPlayer = require('./nextPlayer');
const addCardToHand = require('../player/addCardToHand');

const MIN_PLAYERS_TO_MATCH = 2;

module.exports = (req, res) => {

    try {
        let params = _.pick(req.params, 'gameId');
        if(!validator.isValidGameId(params.gameId)) return res.status(400).json({msg: 'Invalid game id'});
        params.gameId = params.gameId.trim();

        GameModel.findById(params.gameId, (err, gameTable) => {
            if (err){
                res.status(500).json({title: 'Server error', body: 'We could not find you game due to DB issues. Please try again.'});
                throw err;
            }
            if (!gameTable) return res.status(404).json({title: 'Game table not started', body: 'Game table not found.'});
            if (gameTable.active) return res.status(400).json({title: 'Game already begun.', body: 'This game table is already active!'});
            if (!validator.isOwner(gameTable, req.userInfo.id)) return res.status(400).json({title: 'Access denied', body: 'Only the owner can start the game.'});
            if (gameTable.players.length < MIN_PLAYERS_TO_MATCH) return res.status(400).json({title: 'Game table not started',
                body: 'There`s not enough players to start the game.'});

            eventEmitter.sendChatMessage(gameTable._id, 'The game started.');
            setupGame(gameTable);
            gameTable.save((err) => {
                if (err) {
                    res.status(500).json({title: 'Server error', body: 'We could not find you game due to DB issues. Please try again.'});
                    throw err;
                }
                sendGameToPlayers(gameTable.toObject());
                return res.status(200).json({msg: 'Game started'});
            });
        });    
    } catch(err){
        return logger.logError(err);
    }
};

function setupGame(gameTable){

    try {
        gameTable.active = true;
        gameTable.treasures = treasuresList();
        gameTable.dungeons = dungeonsList();
        gameTable.players.forEach((player) => {
            addCardToHand(player, getTreasure(gameTable));
            addCardToHand(player, getTreasure(gameTable));
            addCardToHand(player, getDungeon(gameTable));
            addCardToHand(player, getDungeon(gameTable));
        });
        nextPlayer(gameTable, -1);
        return;    
    } catch(err){
        console.log(err);
        return logger.logError(err);
    }
    
}
