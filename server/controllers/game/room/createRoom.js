const Game = require('../game');
const _ = require('underscore');
const validator = require('../../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const logger = require('../../../../tools/logger');

module.exports = (req, res) => {
    try{
        var body = _.pick(req.body, 'name', 'password');

        if(!validator.isValidGame(body)) {
            res.status(400).json({title: 'Invalid room name', body: 'You have to insert a room name.'});
        } else {
            let gameBody = new Game(body.name.trim(), body.password, req.userInfo.id);
            let newGameModel = new GameModel(gameBody);
            newGameModel.save((err, createdGame) => {
                if (err) {
                    throw err;
                }
                return res.status(200).json({
                    msg: {
                        id: createdGame._id
                    }
                });
            })
        }    
    } catch(err){
        res.status(500).json({title: 'Server error', body: 'Something happened and even we don`t know what it is.'});
        console.log(err);
        return logger.logError(err);
    } 
};