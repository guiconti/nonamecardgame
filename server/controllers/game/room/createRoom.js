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
            res.status(400).json({msg: 'Invalid new game parameters'});
        } else {
            let gameBody = new Game(body.name.trim(), body.password, req.userInfo.id);
            let newGameModel = new GameModel(gameBody);
            newGameModel.save((err, createdGame) => {
                if (err) {
                    res.status(500).json({msg: 'We could not create your game due to DB issues. Try again.'});
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
        return logger.logError(err);
    } 
};