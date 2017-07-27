const _ = require('underscore');
const validator = require('../../utils/validator');
const getPlayerIndex = require('../../utils/getPlayerIndex');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const eventListener = require('../../communication/eventListener');
const eventEmitter = require('../../communication/eventEmitter');
const logger = require('../../../../tools/logger');

module.exports = (req, res) => {
    try{
        let params = _.pick(req.params, 'gameId');
        if(!validator.isValidGameId(params.gameId)) return res.status(400).json({msg: 'Invalid game id.'});
        params.gameId = params.gameId.trim();

        GameModel.findById(params.gameId, (err, gameTable) => {
            if (err){
                res.status(500).json({msg: 'We could not find your game due to DB issues. Try again.'});
                throw err;
            }
            if (!gameTable) return res.status(404).json({msg: 'Game table not found.'});

            let gameRoomInfo = {
                namespace: params.gameId,
                playerRoomId: req.cookies.session,
                players: [],
                notInGame: true,
                boardDisplay: 'hidden'
            }

            let playerIndex = getPlayerIndex(gameTable, req.userInfo);

            if (playerIndex != -1){
                gameRoomInfo.notInGame = false;
                gameRoomInfo.boardDisplay = '';
                playerInfo = {
                    id: gameTable.players[playerIndex].id,
                    name: gameTable.players[playerIndex].name,
                    level: gameTable.players[playerIndex].level,
                    equipmentBonus: gameTable.players[playerIndex].equipmentBonus,
                    combatPower: gameTable.players[playerIndex].combatPower,
                    race: gameTable.players[playerIndex].race,
                    role: gameTable.players[playerIndex].role,
                    cardsOnHand: gameTable.players[playerIndex].hand.length,
                    hand: gameTable.players[playerIndex].hand,
                    board: gameTable.players[playerIndex].board,
                    isMain: true,
                    isPickDungeonEnable: (gameTable.turnInfo.playerId != req.userInfo.id || !validator.isPickDungeonPhase(gameTable.turnInfo.phase))?'disabled':'',
                    isRunEnable: (gameTable.turnInfo.playerId != req.userInfo.id || !validator.isRunEnable(gameTable.turnInfo.phase))?'disabled':'',
                    isUseItemEnable: ((gameTable.turnInfo.playerId != req.userInfo.id && gameTable.turnInfo.helperId != req.userInfo.id) || !validator.isUseItemEnable(gameTable.turnInfo.phase))?'disabled':'',
                    isHelpEnable: (gameTable.turnInfo.playerId != req.userInfo.id || !validator.isHelpEnable(gameTable))?'disabled':''
                };
                gameRoomInfo.players.push(playerInfo);
            }

            for(let i = 0; i < gameTable.players.length; i++){
                if(i != playerIndex){
                    playerInfo = {
                        id: gameTable.players[i].id,
                        name: gameTable.players[i].name,
                        level: gameTable.players[i].level,
                        equipmentBonus: gameTable.players[i].equipmentBonus,
                        combatPower: gameTable.players[i].combatPower,
                        race: gameTable.players[i].race,
                        role: gameTable.players[i].role,
                        cardsOnHand: gameTable.players[i].hand.length,
                        board: gameTable.players[i].board,
                    };
                    gameRoomInfo.players.push(playerInfo);
                }
            }

            eventListener.createGameChat(params.gameId);
            eventEmitter.sendChatMessage(params.gameId, req.userInfo.name + ' connected');

            return res.status(200).render('gameRoom', gameRoomInfo);
        });    
    } catch(err){
        return logger.logError(err);
    }
};
