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
        if(!validator.isValidPlayer(req.userInfo)) return res.status(400).json({msg: 'Invalid player info.'});
        if(!validator.isValidGameId(params.gameId)) return res.status(400).json({msg: 'Invalid game id.'});
        params.gameId = params.gameId.trim();

        GameModel.findById(params.gameId, (err, gameTable) => {
            if (err) {
                res.status(500).json({msg: 'We could not find you table due to DB issues. Please try again later'});
                throw err;
            }
            if (!gameTable) return res.status(404).json({msg: 'Game table not found.'});
            if (gameTable.players.length >= MAX_PLAYERS) return res.status(400).json({msg: 'Game table already full.'});
            if (gameTable.active) return res.status(400).json({msg: 'Game already started.'});
            
            let newPlayer = new Player(req.userInfo.name.trim(), req.userInfo.id, req.cookies.session);
            let playerIndex = getPlayerIndex(gameTable, newPlayer);
            if (playerIndex != -1){
                return res.status(400).json({msg: 'Player already in game'});
            }

            gameTable.players.push(newPlayer);
            gameTable.save((err) => {
                if(err) {
                    res.status(500).json({msg: 'We could not add you due to DB issues. Try again later'});
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
                }
                eventEmitter.sendNewPlayer(params.gameId, playerInfo);

                return res.status(200).json({msg: 'Welcome to the table'});
            });
        });
    } catch(err){
        return logger.logError(err);
    }
};