const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const Game = require('./game/game');
const Player = require('./player/player');
const validator = require('./utils/validator');
const _ = require('underscore');

exports.newGame = (req, res) => {

    var body = _.pick(req.body, 'name', 'password');

    if (!validator.isValidGame(body.name, body.password)) {
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

    if (!validator.isValidGameId(body.gameId)){
        return res.status(400).json({
            msg: 'Invalid game id.'
        });
    }

    GameModel.findById(body.gameId.trim(), (err, gameTable) => {
        if (err) return res.status(404).json({msg: 'Game id not found.'});
        return res.status(200).json({
            msg: gameTable
        });
    });
};
