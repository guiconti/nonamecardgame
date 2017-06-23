const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let GameSchema = new Schema({
    name: String,
    password: String,
    active: {type: Boolean, default: false},
    turnInfo:  {
        playerId: String,
        playerName: String
    },
    players: [{
        name: String,
        id: String,
        communicationId: String,
        level: Number,
        combatPower: Number,
        race: Number,
        role: Number,
        board: [{
            id: String,
            name: String,
            cardType: Number
        }],
        hand: [{
            id: String,
            name: String,
            cardType: Number
        }]
    }]
});

mongoose.model('Game', GameSchema);