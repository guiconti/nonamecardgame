const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let GameSchema = new Schema({
    name: String,
    password: String,
    active: {type: Boolean, default: false},
    turnPlayer:  {type: Number, default: 0},
    players: [{
        name: String,
        id: String,
        communicationId: String,
        level: Number,
        combatPower: Number,
        race: Number,
        role: Number,
        board: [{
            cardId: String
        }],
        hand: [{
            cardId: String
        }]
    }],
    treasures: [{
        id: String,
        name: String,
        cardType: {type: Number, default: 0}
    }],
    dungeons: [{
        id: String,
        name: String,
        cardType: {type: Number, default: 1}
    }]
});

mongoose.model('Game', GameSchema);