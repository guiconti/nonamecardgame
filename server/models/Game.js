const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let GameSchema = new Schema({
    name: String,
    password: String,
    active: {type: Boolean, default: false},
    players: [{
        name: String,
        id: String,
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