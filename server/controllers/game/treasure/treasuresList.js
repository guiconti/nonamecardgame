const deckType = require('../deckType');
const treasuresType = require('./treasuresType');
const equipmentsType = require('./equipmentsType');

//  All treasures (This will go to a database)
module.exports = function() {
    return([
        {
            name: 'Treasure 1',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            bonus: 5
        },
        {
            name: 'Equipment 2',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.HEAD,
            bonus: 1
        },
        {
            name: 'Treasure 3',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            bonus: 2
        },
        {
            name: 'Equipment 4',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.CHEST,
            bonus: 3
        },
        {
            name: 'Treasure 5',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            bonus: 3
        },
        {
            name: 'Equipment 6',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.ONE_HAND,
            bonus: 2
        },
        {
            name: 'Treasure 7',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            bonus: 3
        },
        {
            name: 'Equipment 8',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.HEAD,
            bonus: 2
        },
        {
            name: 'Treasure 9',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            bonus: 4
        },
        {
            name: 'Equipment 10',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.TWO_HAND,
            bonus: 3
        }
    ]);
};