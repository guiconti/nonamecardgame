const _ = require('underscore');
const validator = require('../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const eventEmitter = require('../communication/eventEmitter');

const getTreasure = require('../treasure/getTreasure');
const getDungeon = require('../dungeon/getDungeon');
const treasuresList = require('../treasure/treasuresList');
const dungeonsList = require('../dungeon/dungeonsList');

const MIN_PLAYERS_TO_MATCH = 2;

module.exports = (req, res) => {

    let params = _.pick(req.params, 'gameId');
    if(!validator.isValidGameId) return res.status(400).json({msg: 'Invalid game id'});
    params.gameId = params.gameId.trim();

    GameModel.findById(params.gameId, (err, gameTable) => {
        if (err || !gameTable) return res.status(404).json({msg: 'Game table not found.'});
        if (gameTable.active) return res.status(400).json({msg: 'Game already begun.'});
        if (gameTable.players.length < MIN_PLAYERS_TO_MATCH) return res.status(400).json({msg: 'There`s not enough players to start the game.'});

        setupGame(gameTable);
        gameTable.save((err) => {
            if (err) return res.status(500).json({msg: 'Error with the DB.'});
            eventEmitter.sendChatMessage(gameTable._id, 'The game started.');
            sendGameToPlayers(gameTable.toObject());
            return res.status(200).json({msg: 'Game started'});
        })
    });
};

function sendGameToPlayers(gameTable) {
    gameTable.players.forEach((player) => {
        let playerInfo = _.omit(player, '_id', 'communicationId');
        eventEmitter.sendPrivatePlayerInfo(gameTable._id, player.communicationId, JSON.stringify(playerInfo))
    })
    let gameInfoCensored = {
        players: gameTable.players.map((player) => {
            return _.omit(player, 'communicationId', 'hand', '_id');
        }),
        turnPlayer: gameTable.turnPlayer
    };
    eventEmitter.sendGameInfo(gameTable._id, JSON.stringify(gameInfoCensored));
    //  Fazer isso no front com o game info?
    eventEmitter.sendChatMessage(gameTable._id, 'It`s ' + gameInfoCensored.turnPlayer.name + ' turn.');
}

function setupGame(gameTable){
    gameTable.active = true;
    gameTable.treasures = treasuresList();
    gameTable.dungeons = dungeonsList();
    gameTable.players.forEach((player) => {
        player.hand.push(getTreasure(gameTable));
        player.hand.push(getTreasure(gameTable));
        player.hand.push(getDungeon(gameTable));
        player.hand.push(getDungeon(gameTable));
    });
    //  Change this with some dice result
    gameTable.turnPlayer = {
        id: gameTable.players[0].id,
        name: gameTable.players[0].name
    };
    return;
}
