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
        console.log(gameBody.getTreasure());
        console.log(gameBody.getTreasure());
        console.log(gameBody.getTreasure());
        console.log(gameBody.treasures);
        console.log(gameBody.getDungeon());
        console.log(gameBody.getDungeon());
        console.log(gameBody.getDungeon());
        console.log(gameBody.dungeons);
        gameBody.insertPlayer(new Player('Gib'));
        console.log(gameBody.players);
        gameBody.players[0].addCard(gameBody.getTreasure());

        let newGameModel = new GameModel(gameBody);
        newGameModel.save((err, createdGame) => {
            if (err) res.status(400).json({msg: err});
            res.status(200).json({
                msg: {
                    createdGame
                }
            });
        })
    }
};