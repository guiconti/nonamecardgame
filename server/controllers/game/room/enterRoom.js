const _ = require('underscore');
const validator = require('../../utils/validator');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const handlebarsHelpers = require('handlebars-helpers');
const comparisonHelpers = handlebarsHelpers.comparison();
const getPlayerIndex = require('../../utils/getPlayerIndex');
const racesName = require('../../player/racesName');
const rolesName = require('../../player/rolesName');
const sexName = require('../../player/sexName');
const eventListener = require('../../communication/eventListener');
const eventEmitter = require('../../communication/eventEmitter');
const messagesType = require('../../communication/messagesType');
const logger = require('../../../../tools/logger');

module.exports = (req, res) => {
    try{
        let params = _.pick(req.params, 'gameId');
        if(!validator.isValidGameId(params.gameId)) return res.status(400).json({title: 'Invalid game id', body: 'This game id is not valid.'});

        GameModel.findById(params.gameId, (err, gameTable) => {
            if (err){
                throw err;
            }
            if (!gameTable) return res.status(404).json({title: 'Game table not found', body: 'Could not find a game table with this game id.'});

            let gameRoomInfo = {
                namespace: params.gameId,
                playerRoomId: req.cookies.session,
                players: [],
                notInGame: true,
                renderStartButton: (validator.isOwner(gameTable, req.userInfo.id) && !gameTable.active),
                boardDisplay: 'hidden'
            };

            let playerIndex = getPlayerIndex(gameTable, req.userInfo.id);

            if (playerIndex != -1){
                gameRoomInfo.notInGame = false;
                gameRoomInfo.boardDisplay = '';
                playerInfo = {
                    id: gameTable.players[playerIndex].id,
                    name: gameTable.players[playerIndex].name,
                    level: gameTable.players[playerIndex].level,
                    equipmentBonus: gameTable.players[playerIndex].equipmentBonus,
                    combatPower: gameTable.players[playerIndex].combatPower,
                    race: racesName[gameTable.players[playerIndex].race],
                    role: rolesName[gameTable.players[playerIndex].role],
                    sex: sexName[gameTable.players[playerIndex].sex],
                    cardsOnHand: gameTable.players[playerIndex].cardsOnHand,
                    hand: gameTable.players[playerIndex].hand,
                    equipment: gameTable.players[playerIndex].equipment,
                    isMain: true,
                    isPickDungeonEnable: validator.isPickDungeonEnable(gameTable, req.userInfo.id)?'':'disabled',
                    isRunEnable: validator.isRunEnable(gameTable, req.userInfo.id)?'':'disabled',
                    isUseItemEnable: validator.isUseItemEnable(gameTable, req.userInfo.id)?'':'disabled',
                    isHelpEnable: validator.isHelpEnable(gameTable, req.userInfo.id)?'':'disabled',
                    isInterfereEnable: validator.isInterfereEnable(gameTable, req.userInfo.id)?'':'disabled'
                };
                //  Send pending questions
                if (playerIndex != -1 && gameTable.players[playerIndex].id == gameTable.turnInfo.pendingAnswer.playerId){
                    gameRoomInfo.questionAvaiable = true,
                    gameRoomInfo.questionInfo = gameTable.turnInfo.pendingAnswer.question;
                }
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
                        race: racesName[gameTable.players[i].race],
                        role: rolesName[gameTable.players[i].role],
                        sex: sexName[gameTable.players[i].sex],
                        cardsOnHand: gameTable.players[i].hand.length,
                        equipment: gameTable.players[i].equipment,
                    };
                    gameRoomInfo.players.push(playerInfo);
                }
            }

            gameRoomInfo.chatHistory = gameTable.chatHistory;

            eventListener.createGameChat(params.gameId);
            let message = {
                type: messagesType.INFO,
                text: req.userInfo.name + ' connected'
            };
            eventEmitter.sendChatMessage(params.gameId, message);
            gameTable.chatHistory.unshift(message);

            return res.status(200).render('gameRoom', gameRoomInfo);
        });    
    } catch(err){
        res.status(500).json({title: 'Unknown error', body: 'Something happened and even we don`t know what it is.'});
        console.log(err);
        return logger.logError(err);
    }
};
