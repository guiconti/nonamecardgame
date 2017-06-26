const _ = require('underscore');
const validator = require('../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const eventEmitter = require('../communication/eventEmitter');
const logger = require('../../../tools/logger');

const getTreasure = require('./treasure/getTreasure');
const getDungeon = require('./dungeon/getDungeon');
const treasuresList = require('./treasure/treasuresList');
const dungeonsList = require('./dungeon/dungeonsList');
const turnPhases = require('./turnPhases');
const nextPlayer = require('./nextPlayer');

const MIN_PLAYERS_TO_MATCH = 2;

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
            if (gameTable.active) return res.status(400).json({msg: 'Game already begun.'});
            if (gameTable.players.length < MIN_PLAYERS_TO_MATCH) return res.status(400).json({msg: 'There`s not enough players to start the game.'});

            eventEmitter.sendChatMessage(gameTable._id, 'The game started.');
            setupGame(gameTable);
            gameTable.save((err) => {
                if (err) {
                    res.status(500).json({msg: 'We could not save the game due to DB issues. Try again.'});
                    throw err;
                }
                sendGameToPlayers(gameTable.toObject());
                return res.status(200).json({msg: 'Game started'});
            })
        });    
    } catch(err){
        return logger.logError(err);
    }
};

function sendGameToPlayers(gameTable) {

    try{
        gameTable.players.forEach((player) => {
            let playerInfo = _.omit(player, '_id', 'communicationId');
            eventEmitter.sendPrivatePlayerInfo(gameTable._id, player.communicationId, JSON.stringify(playerInfo))
        })
        let gameInfoCensored = {
            players: gameTable.players.map((player) => {
                return _.omit(player, 'communicationId', 'hand', '_id');
            }),
            turnInfo: gameTable.turnInfo
        };
        eventEmitter.sendTurnInfo(gameTable._id, JSON.stringify(gameInfoCensored.turnInfo));
        //  Fazer isso no front com o game info?
    } catch(err){
        console.log(err);
        return logger.logError(err);
    }
    
}

function setupGame(gameTable){

    try {
        gameTable.active = true;
        gameTable.treasures = treasuresList();
        gameTable.dungeons = dungeonsList();
        gameTable.players.forEach((player) => {
            player.hand.push(getTreasure(gameTable));
            player.hand.push(getTreasure(gameTable));
            player.hand.push(getDungeon(gameTable));
            player.hand.push(getDungeon(gameTable));
        });
        nextPlayer(gameTable, -1);
        return;    
    } catch(err){
        console.log(err);
        return logger.logError(err);
    }
    
}
