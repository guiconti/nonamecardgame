const deckType = require('../deckType');
const dungeonsType = require('./dungeonsType');

//  All dungeons (This will go to a database)
module.exports = function() {
    return([
        {
            name: 'Dungeon 1',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Monster 1',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER,
            stats:{
                combatPower: 1,
                treasureReward: 1
            }
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
            stats:{
                combatPower: 3,
                treasureReward: 1
            }
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
            stats:{
                combatPower: 4,
                treasureReward: 2
            }
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
        }
    ]);
};