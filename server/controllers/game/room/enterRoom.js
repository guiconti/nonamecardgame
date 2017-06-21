const _ = require('underscore');
const validator = require('../../utils/validator');
const getPlayerIndex = require('../../utils/getPlayerIndex');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const eventListener = require('../../communication/eventListener');
const eventEmitter = require('../../communication/eventEmitter');

module.exports = (req, res) => {
    let params = _.pick(req.params, 'gameId');
    if(!validator.isValidGameId(params.gameId)) return res.status(400).json({msg: 'Invalid game id.'});
    params.gameId = params.gameId.trim();

    GameModel.findById(params.gameId, (err, gameTable) => {
        if (err || !gameTable) return res.status(404).json({msg: 'Game table not found.'});

        let gameRoomInfo = {
            namespace: params.gameId,
            playerRoomId: req.cookies.session,
            notInGame: true,
            boardDisplay: 'hidden'
        }

        let playerIndex = getPlayerIndex(gameTable, req.userInfo);

        if (playerIndex != -1){
            gameRoomInfo.notInGame = false;
            gameRoomInfo.boardDisplay = '';
            gameRoomInfo.playerName = gameTable.players[playerIndex].name;
            gameRoomInfo.playerLevel = gameTable.players[playerIndex].level;
            gameRoomInfo.playerCombatPower = gameTable.players[playerIndex].combatPower;
            gameRoomInfo.playerRace = gameTable.players[playerIndex].race;
            gameRoomInfo.playerRole = gameTable.players[playerIndex].role;
        }
        eventListener.createGameChat(params.gameId);
        eventEmitter.sendChatMessage(params.gameId, 'New player connected');

        return res.status(200).render('gameRoom', gameRoomInfo);
    });
};
