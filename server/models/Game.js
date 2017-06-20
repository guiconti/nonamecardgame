const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let GameSchema = new Schema({
    name: String,
    password: String,
    players: [{
        name: String,
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