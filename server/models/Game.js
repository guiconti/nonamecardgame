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
        equipmentType: {type: Number, default: -1},
        raceType: {type: Number, default: -1},
        roleType: {type: Number, default: -1},
        sexType: {type: Number, default: -1},
        bonus: {type: Number, default: 0}
    }],
    discardedTreasures: [{
        name: String,
        deck: Number,
        cardType: Number,
        equipmentType: Number,
        bonus: {type: Number, default: 0}
    }],
    dungeons: [{
        name: String,
        deck: Number,
        cardType: Number,
        combatPower: Number,
        levelReward: Number,
        treasureReward: Number
    }],
    discardedDungeons: [{
        name: String,
        deck: Number,
        cardType: Number,
        combatPower: Number,
        levelReward: Number,
        treasureReward: Number
    }],
    turnInfo:  {
        playerId: String,
        playerName: String,
        helperId: String,
        helperName: String,
        helperTreasures: Number,
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
        sex: Number,
        equipment: [{
            name: String,
            deck: Number,
            cardType: Number,
            equipmentType: Number,
            raceType: {type: Number, default: -1},
            roleType: {type: Number, default: -1},
            sexType: {type: Number, default: -1},
            bonus: {type: Number, default: 0}
        }],
        hand: [{
            name: String,
            deck: Number,
            cardType: Number,
            equipmentType: {type: Number, default: -1},
            raceType: {type: Number, default: -1},
            roleType: {type: Number, default: -1},
            sexType: {type: Number, default: -1},
            bonus: {type: Number, default: 0}
        }],
        cardsOnHand: {type: Number, default: 0}
    }],
    fight: {
        monster: [{
            name: String,
            deck: Number,
            cardType: Number,
            combatPower: {type: Number, default: 0},
            treasureReward: {type: Number, default: 0},
            levelReward: {type: Number, default: 1},
            powerBonus: {type: Number, default: 0},
        }],
        player: {
            combatPower: {type: Number, default: 0},
            powerBonus: {type: Number, default: 0}
        },
        finishedInterferes: [String]
    }
});

mongoose.model('Game', GameSchema);