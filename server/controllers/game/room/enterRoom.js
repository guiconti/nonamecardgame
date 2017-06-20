const _ = require('underscore');
const validator = require('../../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const eventListener = require('../../communication/eventListener');
const eventEmitter = require('../../communication/eventEmitter');

module.exports = (req, res) => {
    var params = _.pick(req.params, 'gameId');
    if(!validator.isValidGameId(params.gameId)) return res.status(400).json({msg: 'Invalid game id.'});
    params.gameId = params.gameId.trim();

    GameModel.findById(params.gameId, (err, gameTable) => {
        if (err) return res.status(404).json({msg: 'Game table not found.'});

        let gameRoomInfo = {
            namespace: params.gameId,
            playerRoomId: req.cookies.session
        }
        if (!validator.isPlayerInGame(gameTable, req.userInfo)){
            gameRoomInfo.showEnterGame = true;
        }

        eventListener.createGameChat(params.gameId);
        eventEmitter.sendChatMessage(params.gameId, 'New player connected');

        return res.status(200).render('gameRoom', gameRoomInfo);
    });
};