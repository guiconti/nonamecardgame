const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const Game = require('./game/game');
const Player = require('./player/player');
const validator = require('./utils/validator');
const _ = require('underscore');
const eventListener = require('./eventListener');
const eventEmitter = require('./eventEmitter');

const tokenManager = require('./tokenManager');

const MAX_PLAYERS = 6;

exports.newGame = (req, res) => {

    var body = _.pick(req.body, 'name', 'password');

    if(!validator.isValidGame(body)) {
        res.status(400).json({msg: 'Invalid new game parameters'});
    } else {
        let gameBody = new Game(body.name.trim());
        let newGameModel = new GameModel(gameBody);
        newGameModel.save((err, createdGame) => {
            if (err) return res.status(400).json({msg: err});
            return res.status(200).json({
                msg: {
                    id: createdGame._id
                }
            });
        })
    }
};

exports.enterGame = (req, res) => {

    var body = _.pick(req.params, 'gameId');
    if(!validator.isValidGameId(body.gameId)) return res.status(400).json({msg: 'Invalid game id.'});

    GameModel.findById(body.gameId.trim(), (err, gameTable) => {
        if (err) return res.status(404).json({msg: 'Game table not found.'});

        let gameRoomInfo = {
            namespace: body.gameId.trim(),
            playerRoomId: req.cookies.session
        }
        if (!validator.isPlayerInGame(gameTable, req.userInfo)){
            gameRoomInfo.showEnterGame = true;
        }

        eventListener.createGameChat(body.gameId.trim());
        eventEmitter.sendChatMessage(body.gameId.trim(), 'New player connected');

        return res.status(200).render('gameRoom', gameRoomInfo);
    });
};

exports.addPlayer = (req, res) => {

    //  TODO: Get ID from the player
    var params = _.pick(req.params, 'gameId');
    if(!validator.isValidPlayer(req.userInfo)) return res.status(400).json({msg: 'Invalid player info.'});
    if(!validator.isValidGameId(params.gameId)) return res.status(400).json({msg: 'Invalid game id.'});

    GameModel.findById(params.gameId.trim(), (err, gameTable) => {
        if (err || !gameTable) return res.status(404).json({msg: 'Game table not found.'});
        if (gameTable.players.length >= MAX_PLAYERS) return res.status(400).json({msg: 'Game table already full.'});
        let newPlayer = new Player(req.userInfo.name.trim(), req.userInfo.id);

        if (validator.isPlayerInGame(gameTable, newPlayer)){
            return res.status(400).json({msg: 'Player already in game'});
        }

        gameTable.players.push(newPlayer);
        gameTable.save((err) => {
            if(err) return res.status(500).json({msg: 'We could not add you to the table. Try again later'});
            eventEmitter.sendChatMessage(params.gameId.trim(), req.userInfo.name.trim() + ' entered the game.')
            return res.status(200).json({msg: 'Welcome to the table'});
        });
    });
};

exports.getCard = (req, res) => {

    let params = _.pick(req.params, 'gameId');

    eventEmitter.sendPrivateChatMessage(params.gameId.trim(), req.cookies.session, 'Privadao');

    return res.status(200).json({msg: 'Toma'});

};

function getPlayerIndex(gameTable, player) {
    let counter = -1;
    return gameTable.players.some((actualPlayer) => {
        counter++;
        return actualPlayer.id == player.id;
    })?counter:-1;
};
