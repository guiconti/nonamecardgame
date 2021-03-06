const deckType = require('../deckType');
const dungeonsType = require('./dungeonsType');
const racestList = require('../../player/racesList');
const rolesList = require('../../player/rolesList');

//  All dungeons (This will go to a database)
module.exports = function() {
    return([
        {
            name: 'Maul Rat',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 1,
            treasureReward: 1,
            levelReward: 1,
            bonusOnRoles: [rolesList.CLERIC],
            modificationBonus: 3,
            text: 'A creature from Hell +3 against clerics. Bad thing: She whacks you. Lose 1 level'
        },
        {
            name: 'Large Angry Chicken',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 2,
            treasureReward: 1,
            levelReward: 1,
            text: 'Fried chicken is delicious. Gain 1 extra level instantly if you defeat it with fire or flame [Not implemented]. Bad thing: Very painful pecking. Lose 1 level'
        },
        {
            name: 'Gelatinous Octahedron',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 2,
            treasureReward: 1,
            levelReward: 1,
            runAwayBonus: 1,
            text: '+1 to run away. Bad thing: If you fail to run away, you must drop all your big items.'
        },
        {
            name: 'Undead Horse',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 4,
            treasureReward: 2,
            levelReward: 1,
            bonusOnRaces: [racestList.DWARF],
            modificationBonus: 5,
            text: '+5 against Dwarves. Bad thing: Kicks, bites, and smells awful. Lose 2 levels'
        },
        {
            name: 'Drooling Slime',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 1,
            treasureReward: 1,
            levelReward: 1,
            text: 'Yucky slime! +4 against Elves. Bad Thing: Discard the footgear you are wearing. Lose 1 level if you have no footgear'
        },
        {
            name: 'Lame Goblin',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 1,
            treasureReward: 1,
            levelReward: 1,
            runAwayBonus: 1,
            text: '+1 to run away. Bad Thing: He whacks you eith his crutch. Lose 1 Level.'
        },
        {
            name: 'Flying Frogs',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 2,
            treasureReward: 1,
            levelReward: 1,
            runAwayBonus: -1,
            text: '-1 to run away. Bad Thing: They bite! Lose 2 levels.'
        },
        {
            name: 'Harpies',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 4,
            treasureReward: 2,
            levelReward: 1,
            bonusOnRoles: [rolesList.WIZARD],
            modificationBonus: 5,
            text: 'They resist magic +5 against Wizards. Bad thing: Their music is really, really bad. Lose 2 Levels.'
        },
        {
            name: 'Potted Plant',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 1,
            treasureReward: 1,
            levelReward: 1,
            text: 'Elves draw an extra treasure after defeating it. Bad Thing: None. Escape is automatic.'
        },
        {
            name: 'Mr. Bones',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 2,
            treasureReward: 1,
            levelReward: 1,
            text: 'If you must flee, you lose 1 level even if you escape. Bad Thing: He bony touch costs you 2 Levels.'
        },
        {
            name: 'Intelligent',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE,
            modificationBonus: 5,
            text: '+5 to level of Monster. Play during combat. If the monster is defeated, draw 1 extra treasure.'
        },
        {
            name: 'Humongous',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE,
            modificationBonus: 10,
            text: '+10 to level of Monster. Play during combat. If the monster is defeated, draw 2 extra treasure.'
        },
        {
            name: 'Enraged',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE,
            modificationBonus: 5,
            text: '+5 to level of Monster. Play during combat. If the monster is defeated, draw 1 extra treasure.'
        },
        {
            name: 'Ancient',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE,
            modificationBonus: 10,
            text: '+10 to level of Monster. Play during combat. If the monster is defeated, draw 2 extra treasure.'
        },
        {
            name: 'Baby',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE,
            modificationBonus: 5,
            text: '-5 to level of Monster. Play during combat. If the monster is defeated, draw 1 less treasure.'
        },
        {
            name: 'Lose 1 Level',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE,
            text: 'Lose 1 Level.'
        },
        {
            name: 'Lose 1 Level',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE,
            text: 'Lose 1 Level.'
        }
    ]);
};