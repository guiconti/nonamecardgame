const _ = require('underscore');
const validator = require('../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const eventEmitter = require('../communication/eventEmitter');
const messagesType = require('../communication/messagesType');
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

        GameModel.findById(params.gameId, (err, gameTable) => {
            if (err){
                throw err;
            }
            if (!gameTable) return res.status(404).json({title: 'Game not found', body: 'This game table was not created.'});
            if (gameTable.active) return res.status(400).json({title: 'Game already begun.', body: 'This game table is already active!'});
            if (!validator.isOwner(gameTable, req.userInfo.id)) return res.status(400).json({title: 'Game table not started', body: 'Only the owner can start the game.'});
            if (gameTable.players.length < MIN_PLAYERS_TO_MATCH) return res.status(400).json({title: 'Game table not started',
                body: 'There`s not enough players to start the game.'});

            let message = {
                type: messagesType.INFO,
                text: 'The game started.'
            };
            eventEmitter.sendChatMessage(gameTable._id, message);
            setupGame(gameTable);
            gameTable.save((err) => {
                if (err) {
                    throw err;
                }
                sendGameToPlayers(gameTable);
                return res.status(200).json({msg: 'Game started'});
            });
        });    
    } catch(err){
        res.status(500).json({title: 'Server error', body: 'Something happened and even we don`t know what it is.'});
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
