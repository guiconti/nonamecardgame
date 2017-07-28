const _ = require('underscore');
const validator = require('../utils/validator');
const getPlayerIndex = require('../utils/getPlayerIndex');
const Player = require('../player/player');
const eventEmitter = require('../communication/eventEmitter');
const mongoose = require('mongoose');
const GameModel = mongoose.model('Game');
const logger = require('../../../tools/logger');

const MAX_PLAYERS = 6;

module.exports = (req, res) => {

    try{
        var params = _.pick(req.params, 'gameId');
        if(!validator.isValidPlayer(req.userInfo)) return res.status(400).json({title: 'Invalid player info', body: 'This player id is not valid.'});
        if(!validator.isValidGameId(params.gameId)) return res.status(400).json({title: 'Invalid game id', body: 'This game id is not valid.'});
        params.gameId = params.gameId.trim();

        GameModel.findById(params.gameId, (err, gameTable) => {
            if (err) {
                throw err;
            }
            if (!gameTable) return res.status(404).json({title: 'Game table not found', body: 'Could not find a game table with this game id.'});
            if (gameTable.players.length >= MAX_PLAYERS) return res.status(400).json({title: 'Game table already full.', 
                body: 'This table has already reached the players limit (6)'});
            if (gameTable.active) return res.status(400).json({title: 'Game already started.', body: 'You cannot join an ongoing game.'});
            
            let newPlayer = new Player(req.userInfo.name.trim(), req.userInfo.id, req.cookies.session);
            let playerIndex = getPlayerIndex(gameTable, newPlayer);
            if (playerIndex != -1){
                return res.status(400).json({title: 'Player already in game', body: 'You already joined this room.'});
            }

            gameTable.players.push(newPlayer);
            gameTable.save((err) => {
                if(err) {
                    throw err;
                }
                eventEmitter.sendChatMessage(params.gameId, req.userInfo.name.trim() + ' entered the game.');

                //  Build player info for other players to add
                let playerInfo = {
                    id: newPlayer.id,
                    name: newPlayer.name,
                    level: newPlayer.level,
                    equipmentBonus: newPlayer.equipmentBonus,
                    combatPower: newPlayer.combatPower,
                    race: newPlayer.race,
                    role: newPlayer.role,
                    cardsOnHand: newPlayer.hand.length
                };
                eventEmitter.sendNewPlayer(params.gameId, playerInfo);

                return res.status(200).json({msg: 'Welcome to the table'});
            });
        });
    } catch(err){
        res.status(500).json({title: 'Server error', body: 'Something happened and even we don`t know what it is.'});
        console.log(err);
        return logger.logError(err);
    }
};