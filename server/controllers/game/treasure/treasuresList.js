const deckType = require('../deckType');
const treasuresType = require('./treasuresType');

//  All treasures (This will go to a database)
module.exports = function() {
    return([
        {
            name: 'Treasure 1',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE
        },
        {
            name: 'Treasure 2',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT
        },
        {
            name: 'Treasure 3',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE
        },
        {
            name: 'Treasure 4',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT
        },
        {
            name: 'Treasure 5',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE
        },
        {
            name: 'Treasure 6',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT
        },
        {
            name: 'Treasure 7',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE
        },
        {
            name: 'Treasure 8',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT
        },
        {
            name: 'Treasure 9',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE
        },
        {
            name: 'Treasure 10',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT
        }
    ]);
};