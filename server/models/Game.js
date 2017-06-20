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
    }]
});

mongoose.model('Game', GameSchema);