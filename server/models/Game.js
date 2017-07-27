const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let GameSchema = new Schema({
    name: String,
    password: String,
    active: {type: Boolean, default: false},
    ownerId: String,
    treasures: [{
        name: String,
        deck: Number,
        cardType: Number,
    }],
    dungeons: [{
        name: String,
        deck: Number,
        cardType: Number,
        stats:{
            combatPower: Number,
            treasureReward: Number
        }
    }],
    turnInfo:  {
        playerId: String,
        helperId: String,
        playerName: String,
        helperName: String,
        phase: Number
    },
    players: [{
        name: String,
        id: String,
        communicationId: String,
        level: Number,
        equipmentBonus: Number,
        combatPower: Number,
        race: Number,
        role: Number,
        board: [{
            name: String,
            deck: Number,
            cardType: Number
        }],
        hand: [{
            name: String,
            deck: Number,
            cardType: Number
        }],
        cardsOnHand: {type: Number, default: 0}
    }],
    table: {
        monster: [{
            name: String,
            stats: {
                combatPower: Number,
                treasureReward: Number
            }
        }]
    }
});

mongoose.model('Game', GameSchema);