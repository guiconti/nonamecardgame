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
            name: 'Drooling Slime',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 1,
            treasureReward: 1,
            levelReward: 1,
            text: 'Yucky slime! +4 against Elves. Bad Thing: Discard the footgear you are wearing. Lose 1 level if you have no footgear'
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
        // OLD
        {
            name: 'Dungeon 1',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 1',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 1,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 3',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.RACE
        },
        {
            name: 'Monster 2',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 3,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 5',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 3',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 4,
            treasureReward: 2,
            levelReward: 1
        },
        {
            name: 'Dungeon 7',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Dungeon 8',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.ROLE
        },
        {
            name: 'Dungeon 9',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 10',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 11',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 4',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 1,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 12',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.RACE
        },
        {
            name: 'Monster 5',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 3,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 13',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 6',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 4,
            treasureReward: 2,
            levelReward: 1
        },
        {
            name: 'Dungeon 14',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Dungeon 15',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.ROLE
        },
        {
            name: 'Dungeon 16',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 17',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 1',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 1',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 1,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 3',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.RACE
        },
        {
            name: 'Monster 2',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 3,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 5',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 3',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 4,
            treasureReward: 2,
            levelReward: 1
        },
        {
            name: 'Dungeon 7',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Dungeon 8',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.ROLE
        },
        {
            name: 'Dungeon 9',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 10',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 11',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 4',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 1,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 12',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.RACE
        },
        {
            name: 'Monster 5',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 3,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 13',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 6',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 4,
            treasureReward: 2,
            levelReward: 1
        },
        {
            name: 'Dungeon 14',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Dungeon 15',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.ROLE
        },
        {
            name: 'Dungeon 16',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 17',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 1',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 1',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 1,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 3',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.RACE
        },
        {
            name: 'Monster 2',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 3,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 5',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 3',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 4,
            treasureReward: 2,
            levelReward: 1
        },
        {
            name: 'Dungeon 7',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Dungeon 8',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.ROLE
        },
        {
            name: 'Dungeon 9',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 10',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 11',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 4',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 1,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 12',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.RACE
        },
        {
            name: 'Monster 5',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 3,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 13',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 6',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 4,
            treasureReward: 2,
            levelReward: 1
        },
        {
            name: 'Dungeon 14',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Dungeon 15',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.ROLE
        },
        {
            name: 'Dungeon 16',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 17',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 1',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 1',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 1,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 3',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.RACE
        },
        {
            name: 'Monster 2',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 3,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 5',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 3',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 4,
            treasureReward: 2,
            levelReward: 1
        },
        {
            name: 'Dungeon 7',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Dungeon 8',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.ROLE
        },
        {
            name: 'Dungeon 9',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 10',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 11',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 4',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 1,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 12',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.RACE
        },
        {
            name: 'Monster 5',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 3,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 13',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 6',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 4,
            treasureReward: 2,
            levelReward: 1
        },
        {
            name: 'Dungeon 14',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Dungeon 15',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.ROLE
        },
        {
            name: 'Dungeon 16',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 17',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 1',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 1',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 1,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 3',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.RACE
        },
        {
            name: 'Monster 2',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 3,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 5',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 3',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 4,
            treasureReward: 2,
            levelReward: 1
        },
        {
            name: 'Dungeon 7',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Dungeon 8',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.ROLE
        },
        {
            name: 'Dungeon 9',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 10',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 11',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 4',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 1,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 12',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.RACE
        },
        {
            name: 'Monster 5',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 3,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 13',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 6',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 4,
            treasureReward: 2,
            levelReward: 1
        },
        {
            name: 'Dungeon 14',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Dungeon 15',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.ROLE
        },
        {
            name: 'Dungeon 16',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 17',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 1',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 1',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 1,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 3',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.RACE
        },
        {
            name: 'Monster 2',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 3,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 5',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 3',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 4,
            treasureReward: 2,
            levelReward: 1
        },
        {
            name: 'Dungeon 7',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Dungeon 8',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.ROLE
        },
        {
            name: 'Dungeon 9',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 10',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 11',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 4',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 1,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 12',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.RACE
        },
        {
            name: 'Monster 5',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 3,
            treasureReward: 1,
            levelReward: 1
        },
        {
            name: 'Dungeon 13',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 6',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            combatPower: 4,
            treasureReward: 2,
            levelReward: 1
        },
        {
            name: 'Dungeon 14',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Dungeon 15',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.ROLE
        },
        {
            name: 'Dungeon 16',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        },
        {
            name: 'Dungeon 17',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.USABLE
        }
    ]);
};