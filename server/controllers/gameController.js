const Game = require('./game');
const validator = require('./utils/validator');
const _ = require('underscore');

exports.newGame = (req, res) => {

    var body = _.pick(req.body, 'name', 'password');

    if (!validator.isValidGame(body.name, body.password)) {
        res.status(400).json({msg: 'Invalid new game parameters'});
    } else {
        var createdGame = new Game(body.name.trim());
        res.status(200).json({
            msg: {
                id: createdGame.id
            }
        });
    }
};