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
            name: 'Dungeon 2',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER
        },
        {
            name: 'Dungeon 3',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Dungeon 4',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER
        },
        {
            name: 'Dungeon 5',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Dungeon 6',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER
        },
        {
            name: 'Dungeon 7',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Dungeon 8',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER
        },
        {
            name: 'Dungeon 9',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.CURSE
        },
        {
            name: 'Dungeon 10',
            deck: deckType.DUNGEON,
            cardType: dungeonsType.MONSTER
        }
    ]);
};