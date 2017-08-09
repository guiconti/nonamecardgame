const deckType = require('../deckType');
const treasuresType = require('./treasuresType');
const equipmentsType = require('./equipmentsType');
const racesList = require('../../player/racesList');
const rolesList = require('../../player/rolesList');
const sexList = require('../../player/sexList');

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
            name: 'Male Orc',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.RACE,
            raceType: racesList.ORC,
            sexType: sexList.FEMALE
        },
        {
            name: 'Female Orc',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.RACE,
            raceType: racesList.ORC,
            sexType: sexList.MALE
        },
        {
            name: 'Male Dwarf',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.RACE,
            raceType: racesList.DWARF,
            sexType: sexList.MALE
        },
        {
            name: 'Female Dwarf',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.RACE,
            raceType: racesList.Dwarf,
            sexType: sexList.FEMALE
        },
        {
            name: 'Female Halfling',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.RACE,
            raceType: racesList.HALFLING,
            sexType: sexList.FEMALE
        },
        {
            name: 'Male Halfling',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.RACE,
            raceType: racesList.HALFLING,
            sexType: sexList.MALE
        },
        {
            name: 'Female Elf',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.RACE,
            raceType: racesList.ELF,
            sexType: sexList.FEMALE
        },
        {
            name: 'Male Elf',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.RACE,
            raceType: racesList.ELF,
            sexType: sexList.MALE
        },
        {
            name: 'Cleric',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.ROLE,
            roleType: rolesList.CLERIC
        },
        {
            name: 'Thief',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.ROLE,
            roleType: rolesList.THIEF
        },
        {
            name: 'Warrior',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.ROLE,
            roleType: rolesList.WARRIOR
        },
        {
            name: 'Wizard',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.ROLE,
            roleType: rolesList.WIZARD
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