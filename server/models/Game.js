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
        bonus: {type: Number, default: 0}
    }],
    dungeons: [{
        name: String,
        deck: Number,
        cardType: Number,
        combatPower: Number,
        treasureReward: Number
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
            cardType: Number,
            bonus: {type: Number, default: 0}
        }],
        cardsOnHand: {type: Number, default: 0}
    }],
    fight: {
        monster: [{
            name: String,
            combatPower: {type: Number, default: 0},
            treasureReward: {type: Number, default: 0},
            powerBonus: {type: Number, default: 0}
        }],
        player: {
            combatPower: {type: Number, default: 0},
            powerBonus: {type: Number, default: 0}
        }
    }
});

mongoose.model('Game', GameSchema);