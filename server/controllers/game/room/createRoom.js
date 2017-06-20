const game = require('../game');
const _ = require('underscore');
const validator = require('../../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');

module.exports = (req, res) => {
    var body = _.pick(req.body, 'name', 'password');

    if(!validator.isValidGame(body)) {
        res.status(400).json({msg: 'Invalid new game parameters'});
    } else {
        let gameBody = game.newGame(body.name.trim());
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