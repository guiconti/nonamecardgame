const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const Game = require('./game/game');
const Player = require('./player/player');
const validator = require('./utils/validator');
const _ = require('underscore');

const MAX_PLAYERS = 6;

exports.newGame = (req, res) => {

    var body = _.pick(req.body, 'name', 'password');

    if(!validator.isValidGame(body)) {
        res.status(400).json({msg: 'Invalid new game parameters'});
    } else {
        let gameBody = new Game(body.name.trim(), body.password.trim());
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
        return res.status(200).json({
            msg: gameTable
        });
    });
};

exports.addPlayer = (req, res) => {

    //  TODO: Get ID from the player
    var body = _.pick(req.body, 'gameId', 'name');
    if(!validator.isValidPlayer(body)) return res.status(400).json({msg: 'Invalid player info.'});
    if(!validator.isValidGameId(body.gameId)) return res.status(400).json({msg: 'Invalid game id.'});

    GameModel.findById(body.gameId.trim(), (err, gameTable) => {
        if (err || !gameTable) return res.status(404).json({msg: 'Game table not found.'});
        if (gameTable.players.length >= MAX_PLAYERS) return res.status(400).json({msg: 'Game table already full.'});
        let newPlayer = new Player(body.name.trim());
        gameTable.players.push(newPlayer);
        gameTable.save((err) => {
            if(err) return res.status(500).json({msg: 'We could not add you to the table. Try again later'});
            return res.status(200).json({msg: 'Welcome to the table'});
        });
    });
};
