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
            name: 'Potion of Idiotic Bravery',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            bonus: 2
        },
        {
            name: 'Potion of Halitosis',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            bonus: 2
        },
        {
            name: 'Nasty-Tasting Sport Drink',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            bonus: 2
        },
        {
            name: 'Freezing Explosive Potion',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            bonus: 3
        },
        {
            name: 'Eletric Radioactive Acid Potion',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            bonus: 5
        },
        {
            name: 'Sleep Potion',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            bonus: 2
        },
        {
            name: 'Potion of Confusion',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            bonus: 3
        },
        {
            name: 'Flaming Poison Potion',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            bonus: 3
        },
        {
            name: 'Cleric',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.ROLE,
            roleType: rolesList.CLERIC
        },
        {
            name: 'Cleric',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.ROLE,
            roleType: rolesList.CLERIC
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
            name: 'Thief',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.ROLE,
            roleType: rolesList.THIEF
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
            name: 'Warrior',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.ROLE,
            roleType: rolesList.WARRIOR
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
            name: 'Wizard',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.ROLE,
            roleType: rolesList.WIZARD
        },
        {
            name: 'Wizard',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.ROLE,
            roleType: rolesList.WIZARD
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
            name: 'Male Halfling',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.RACE,
            raceType: racesList.HALFLING,
            sexType: sexList.MALE
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
            name: 'Female Halfling',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.RACE,
            raceType: racesList.HALFLING,
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
            name: 'Male Elf',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.RACE,
            raceType: racesList.ELF,
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
            name: 'Invoke Obscure Rules',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            bonus: 1,
            text: 'Go Up A Level'
        },
        {
            name: 'Bribe GM With Food',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            text: 'Go Up A Level'
        },
        {
            name: 'Boil An Anthill',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            text: 'Go Up A Level'
        },
        {
            name: 'Whine At The GM',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            text: 'You can´t use this if you are currently the highest-level player, or tied for highest. Go Up A Level'
        },
        {
            name: 'Point Of General Studliness',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            text: 'Go Up A Level'
        },
        {
            name: '1000 Gold Pieces',
            deck: deckType.TREASURE,
            cardType: treasuresType.CONSUMABLE,
            text: 'Go Up A Level'
        },
        {
            name: 'Bad-Ass Bandanna',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.HEAD,
            bonus: 3,
            usableByRaces: [racesList.HUMAN],
            text: 'Usable By Human Only. +3 Combat power'
        },
        {
            name: 'Helm Of Courage',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.HEAD,
            bonus: 1,
            text: '+1 Combat power'
        },
        {
            name: 'Pointy Hat Of Power',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.HEAD,
            bonus: 3,
            usableByRoles: [rolesList.WIZARD],
            text: 'Usable by Wizard Only. +3 Combat power'
        },
        {
            name: 'Boots of Butt-Kicking',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.FOOTGEAR,
            bonus: 2,
            text: '+2 Combat power'
        },
        // Old
        {
            name: 'Male Orc',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.RACE,
            raceType: racesList.ORC,
            sexType: sexList.MALE
        },
        {
            name: 'Female Orc',
            deck: deckType.TREASURE,
            cardType: treasuresType.EQUIPMENT,
            equipmentType: equipmentsType.RACE,
            raceType: racesList.ORC,
            sexType: sexList.FEMALE
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